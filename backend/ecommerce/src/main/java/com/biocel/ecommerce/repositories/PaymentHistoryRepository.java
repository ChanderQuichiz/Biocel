package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Integer> {
}
