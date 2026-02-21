package com.biocel.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.biocel.ecommerce.entities.OrderDetail;
import com.biocel.ecommerce.repositories.OrderDetailRepository;

@Service
public class OrderDetailService {
@Autowired
OrderDetailRepository orderDetailRepository;
    public Page<OrderDetail> findAll(Specification<OrderDetail> spec, Pageable pageable) {
        return orderDetailRepository.findAll(spec, pageable);
    }
    public void save(OrderDetail orderDetail) {
        orderDetailRepository.save(orderDetail);
    }
    
}
