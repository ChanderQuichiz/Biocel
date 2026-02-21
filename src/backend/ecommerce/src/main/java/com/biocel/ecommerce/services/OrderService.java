package com.biocel.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.biocel.ecommerce.entities.Order;
import com.biocel.ecommerce.entities.OrderDetail;
import com.biocel.ecommerce.entities.OrderTransaction;
import com.biocel.ecommerce.entities.Product;
import com.biocel.ecommerce.repositories.OrderRepository;



@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderDetailService orderDetailService;

@Transactional
public Boolean createOrder(OrderTransaction orderTransaction) {
   Order ordersaved = orderRepository.save(orderTransaction.getOrder());
    for(OrderDetail orderDetail : orderTransaction.getDetails() ){
        Product product = productService.findByIdForUpdate(orderDetail.getProduct().getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
        if(product.getStock() < orderDetail.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }
        product.setStock(product.getStock() - orderDetail.getQuantity());
        orderDetail.setOrder(ordersaved);
        orderDetailService.save(orderDetail);
    }

    return true;
}

public Page<Order> findAll(Specification<Order> spec, Pageable pageable) {
    
    return orderRepository.findAll(spec, pageable);
}

public Order save(Order entity) {
    return orderRepository.save(entity);
    }
}
