package com.biocel.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.Address;
import com.biocel.ecommerce.repositories.AddressRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;
    
    @PostMapping("/save")
    public ResponseEntity<Address> postMethodName(@RequestBody Address address) {
        Address valid = addressRepository.save(address);
        if(valid == null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok(valid);
    }
    @GetMapping("/findallbyuser/{userId}")
    public ResponseEntity<List<Address>> findAllByUser(@PathVariable Integer userId) {
        List<Address> found = addressRepository.findAllByUser_userId(userId);
        if(found == null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok(found);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        addressRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
