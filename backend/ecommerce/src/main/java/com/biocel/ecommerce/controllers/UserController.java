package com.biocel.ecommerce.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.User;
import com.biocel.ecommerce.repositories.UserRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserRepository repository;
    @PostMapping("/save")
    public ResponseEntity<User> save(@RequestBody User entity) {
        User valid = repository.save(entity);
        if(valid != null) {
            return ResponseEntity.ok(valid);
        } else {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/findbyid/{id}")
    public ResponseEntity<User> findById(@PathVariable int id) {
        User user = repository.findById(id).orElse(null);
        if(user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
