package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.Product;

import jakarta.persistence.LockModeType;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("""
            SELECT p FROM Product p
            WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :text, '%')) OR LOWER(p.category) LIKE LOWER(CONCAT('%', :text, '%'))
            """)
    public List<Product> searchProducts(@Param("text") String text);
    @Lock(LockModeType.PESSIMISTIC_WRITE)        
    @Query("""
            SELECT p FROM Product p
            WHERE p.productId = :id
            """)
    public Optional<Product> findByIdForUpdate(@Param("id") Integer id);
}
