package com.biocel.ecommerce.services;

import java.util.List;
import java.util.Optional;

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

    public Product save(Product entity) {
        return productRepository.save(entity);
    }

    public List<Product> findAllById(List<Integer> ids) {
        return productRepository.findAllById(ids);}

    public double count() {
        return productRepository.count();
    }

    public void deleteById(int id) {
        productRepository.deleteById(id);}

    public List<Product> searchProducts(String text) {
        return productRepository.searchProducts(text);
    }

    public Optional<Product> findByIdForUpdate(Integer productId) {
        return productRepository.findByIdForUpdate(productId);
    }

}
