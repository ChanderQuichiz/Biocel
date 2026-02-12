package com.biocel.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.biocel.ecommerce.entities.Order;
import com.biocel.ecommerce.entities.OrderDetail;
import com.biocel.ecommerce.entities.OrderTransaction;
import com.biocel.ecommerce.entities.Payment;
import com.biocel.ecommerce.entities.Product;
import com.biocel.ecommerce.repositories.OrderDetailRepository;
import com.biocel.ecommerce.repositories.OrderRepository;
import com.biocel.ecommerce.repositories.PaymentRepository;
import com.biocel.ecommerce.repositories.ProductRepository;



@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

@Transactional
public Boolean createOrder(OrderTransaction orderTransaction) {
   Order ordersaved = orderRepository.save(orderTransaction.getOrder());
    for(OrderDetail orderDetail : orderTransaction.getDetails() ){
        Product product = productRepository.findByIdForUpdate(orderDetail.getProduct().getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
        if(product.getStock() < orderDetail.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }
        product.setStock(product.getStock() - orderDetail.getQuantity());
        orderDetail.setOrder(ordersaved);
        orderDetailRepository.save(orderDetail);
    }
    Payment payment = new Payment();
    payment.setOrder(ordersaved);
    payment.setPaymentMethod(Payment.PaymentMethod.valueOf(orderTransaction.getPaymentMethod()));
    paymentRepository.save(payment);
    return true;
}
}
