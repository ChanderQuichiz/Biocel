package com.biocel.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.Order;
import com.biocel.ecommerce.entities.OrderTransaction;
import com.biocel.ecommerce.services.OrderService;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

import org.springframework.web.bind.annotation.GetMapping;


@RequestMapping("/orders")
@CrossOrigin

@RestController
public class OrderController {

  

    @Autowired
    private OrderService orderService;
    
    @PostMapping("/createorder")
    public ResponseEntity<String> createOrder(@RequestBody OrderTransaction orderTransaction){
        Boolean result = orderService.createOrder(orderTransaction);
        if (result) {
            return ResponseEntity.ok("Order created successfully");
        } else {
            return ResponseEntity.status(400).body("Error creating order");
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<Order>> search(@And({
        @Spec(path = "user.userId", spec = Equal.class),
        @Spec(path = "status", spec = Equal.class),
        @Spec(path = "orderId", spec = Equal.class)
    })Specification<Order> spec, Pageable pageable) {
        Page<Order> orders = orderService.findAll(spec, pageable);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<Order> postMethodName(@RequestBody Order entity) {
        Order valid = orderService.save(entity);
        if(valid == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(valid, HttpStatus.OK);
    }
    
}
