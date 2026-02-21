package com.biocel.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biocel.ecommerce.entities.Address;
import com.biocel.ecommerce.repositories.AddressRepository;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;
    public Address save(Address address) {
        return addressRepository.save(address);
    }
    public List<Address> findAllByUser(Integer userId) {
        
        return addressRepository.findAllByUser_userId(userId);
    }
    public void delete(int id) {
        addressRepository.deleteById(id);
    }
}
