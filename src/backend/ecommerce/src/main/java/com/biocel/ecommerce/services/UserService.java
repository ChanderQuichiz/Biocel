package com.biocel.ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biocel.ecommerce.entities.User;
import com.biocel.ecommerce.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User save(User entity) {
        return userRepository.save(entity);
    }

    public Object findById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
    
}
