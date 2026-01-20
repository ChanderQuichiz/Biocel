package com.biocel.ecommerce.repositories;

import com.biocel.ecommerce.entities.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("""
            SELECT p FROM Product p
            WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :text, '%')) OR LOWER(p.category) LIKE LOWER(CONCAT('%', :text, '%'))
            """)
    public List<Product> searchProducts(@Param("text") String text);
}
