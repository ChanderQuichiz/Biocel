package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.DeliveryHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryHistoryRepository extends JpaRepository<DeliveryHistory, Integer> {
}
