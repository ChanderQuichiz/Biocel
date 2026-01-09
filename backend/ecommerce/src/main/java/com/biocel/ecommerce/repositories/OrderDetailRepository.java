package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}
