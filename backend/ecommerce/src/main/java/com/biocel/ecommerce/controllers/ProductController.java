package com.biocel.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.Product;
import com.biocel.ecommerce.repositories.ProductRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin    
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProductRepository productRepository;
    @PostMapping("/save")
    public ResponseEntity<Product> save(@RequestBody Product entity) {
        Product valid = productRepository.save(entity);
        if(valid != null) {
            return ResponseEntity.ok(valid);
        } else {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/findbyid/{id}")
    public ResponseEntity<Product> findbyid(@PathVariable int id) {
        Product product = productRepository.findById(id).orElse(null);
        if(product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}