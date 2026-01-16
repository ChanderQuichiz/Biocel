package com.biocel.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.OrderTransaction;
import com.biocel.ecommerce.services.OrderService;

@CrossOrigin
@RequestMapping("/order")
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
}
