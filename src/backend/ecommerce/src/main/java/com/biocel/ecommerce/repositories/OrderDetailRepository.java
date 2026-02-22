package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.OrderDetail;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>, JpaSpecificationExecutor<OrderDetail> {
    
    @Query("SELECT COALESCE(SUM(od.quantity), 0) FROM OrderDetail od")
    Long getTotalItemsCount();
}

