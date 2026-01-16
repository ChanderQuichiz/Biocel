package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.Order;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Procedure(procedureName = "create_order")
    void createOrder(
        @Param("p_user_id") int p_user_id,
        @Param("p_address_id") int p_address_id,
        @Param("p_total") double p_total,
        @Param("p_estimated_delivery") LocalDateTime p_estimated_delivery,
        @Param("p_payment_method") String p_payment_method,
        @Param("p_details") String p_details
    );
}
