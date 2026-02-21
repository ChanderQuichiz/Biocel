package com.biocel.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biocel.ecommerce.entities.Product;
import com.biocel.ecommerce.services.ProductService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;






@RestController
@CrossOrigin    
@RequestMapping("/product")
public class ProductController {
   
    @Autowired
    private ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<Product> save(@RequestBody Product entity) {
        Product valid = productService.save(entity);
        if(valid != null) {
            return ResponseEntity.ok(valid);
        } else {
            return ResponseEntity.status(500).build();
        }
    }
    @PostMapping("/findallbyid")
    public ResponseEntity<List<Product>> findbyid( @RequestBody List<Integer> ids) {
        List<Product> products = productService.findAllById(ids);
        return ResponseEntity.ok(products);
        }
    
    @GetMapping("/page/{page}")
    public ResponseEntity<List<Product>> page(@PathVariable int page) {
        List<Product> products = productService.getPagedProducts(page, 10);
        return ResponseEntity.ok(products);
        }
    @GetMapping("/pagenumber")
public ResponseEntity<Long> getPageNumber() {
    long totalPages = (long) Math.ceil(productService.count() / 10.0);
    return ResponseEntity.ok(totalPages);
}
@DeleteMapping("/delete/{id}")
public ResponseEntity<Void> delete(@PathVariable int id) {
    productService.deleteById(id);
    return ResponseEntity.ok().build();
}
@GetMapping("/searchproductsbytext/{text}")
public ResponseEntity<List<Product>> searchProductsBytext(@PathVariable String text) {
    List<Product> products = productService.searchProducts(text);
    return ResponseEntity.ok(products);
}

}