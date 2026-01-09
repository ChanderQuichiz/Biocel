package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
}
