package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.Order;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>, JpaSpecificationExecutor<Order> {

    @Query("SELECT COALESCE(SUM(o.total), 0) FROM Order o")
    BigDecimal getTotalRevenue();

    @Query("SELECT COUNT(DISTINCT o.user.userId) FROM Order o")
    Long countDistinctCustomers();

    @Query(value = "SELECT p.product_id as productId, p.name as name, " +
            "COALESCE(SUM(od.quantity), 0) as units, " +
            "COALESCE(SUM(od.subtotal), 0) as revenue " +
            "FROM order_details od " +
            "JOIN products p ON p.product_id = od.product_id " +
            "GROUP BY p.product_id, p.name " +
            "ORDER BY SUM(od.quantity) DESC " +
            "LIMIT ?1", nativeQuery = true)
    List<Object[]> findTopProducts(int limit);

    @Query(value = "SELECT DATE(o.created_at) as day, COALESCE(SUM(o.total), 0) as total " +
            "FROM orders o " +
            "WHERE o.created_at >= DATE_SUB(CURDATE(), INTERVAL ?1 DAY) " +
            "GROUP BY DATE(o.created_at) " +
            "ORDER BY day ASC", nativeQuery = true)
    List<Object[]> findSalesLastDays(int days);

    @Query(value = "SELECT order_id, created_at, status, delivery_method, total " +
            "FROM orders WHERE order_id = ?1", nativeQuery = true)
    List<Object[]> findOrderHeaderById(int orderId);

    @Query(value = "SELECT p.name, od.quantity, od.price, od.subtotal " +
            "FROM order_details od " +
            "JOIN products p ON p.product_id = od.product_id " +
            "WHERE od.order_id = ?1", nativeQuery = true)
    List<Object[]> findOrderItemsByOrderId(int orderId);
}

