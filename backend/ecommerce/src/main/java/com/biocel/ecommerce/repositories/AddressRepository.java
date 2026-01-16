package com.biocel.ecommerce.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biocel.ecommerce.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    public List<Address> findAllByUser_userId(Integer userId);
}
