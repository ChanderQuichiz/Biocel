package com.biocel.ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biocel.ecommerce.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
}
