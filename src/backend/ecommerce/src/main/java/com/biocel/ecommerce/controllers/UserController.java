package com.biocel.ecommerce.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.User;
import com.biocel.ecommerce.services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;




@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/save")
    public ResponseEntity<User> save(@RequestBody User entity) {
        User valid = userService.save(entity);
        if(valid != null) {
            return ResponseEntity.ok(valid);
        } else {
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping("/findbyid/{id}")
    public ResponseEntity<Object> findById(@PathVariable int id) {
        Object user = userService.findById(id);
        if(user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/access")
    public ResponseEntity<User> access(@RequestBody User access) {
        User user = userService.findByEmailAndPassword(access.getEmail(), access.getPassword());
        if(user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam(required = false) String email) {
        List<User> users;
        if(email != null && !email.isEmpty()) {
            users = userService.searchByEmail(email);
        } else {
            users = userService.findAll();
        }
        return ResponseEntity.ok(Map.of("content", users));
    }
}
