package com.biocel.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.OrderDetail;
import com.biocel.ecommerce.services.OrderDetailService;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/orderdetails")
@CrossOrigin
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;
    
    @GetMapping("/search")
    public ResponseEntity<Page<OrderDetail>> search(@And({
        @Spec(path = "order.orderId", spec = Equal.class),
    })Specification<OrderDetail> spec, Pageable pageable) {
       Page<OrderDetail> result = orderDetailService.findAll(spec, pageable);
        return ResponseEntity.ok(result);
    }
    
}
