package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.DeliveryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryHistoryRepository extends JpaRepository<DeliveryHistory, Integer> {
}
