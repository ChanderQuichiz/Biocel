package com.biocel.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biocel.ecommerce.entities.OrderTransaction;
import com.biocel.ecommerce.repositories.OrderRepository;


@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    public Boolean createOrder(OrderTransaction orderTransaction) {
        try {
            orderRepository.createOrder(
                orderTransaction.getOrder().getUser().getUserId(),
                orderTransaction.getOrder().getAddress().getAddressId(),
                orderTransaction.getOrder().getTotal().doubleValue(),
                orderTransaction.getOrder().getEstimatedDelivery(),
                orderTransaction.getPaymentMethod(),
                orderTransaction.getDetails()
            );
            return true;
        } catch (Exception e) {
            System.err.println("Error creating order: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}
