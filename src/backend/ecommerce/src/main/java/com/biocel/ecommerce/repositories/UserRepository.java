package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAndPassword(String email, String password);
    List<User> findByEmailContainingIgnoreCase(String email);
}
