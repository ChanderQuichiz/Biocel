package com.biocel.ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.biocel.ecommerce.entities.Product;
import com.biocel.ecommerce.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    
    public List<Product> getPagedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        Page<Product> productPage = productRepository.findAll(pageable);
        return productPage.getContent();
    }
}
