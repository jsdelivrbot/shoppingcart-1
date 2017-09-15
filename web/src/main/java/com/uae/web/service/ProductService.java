package com.uae.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uae.web.model.Product;
import com.uae.web.repository.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public List<Product> findAll() {
	return productRepository.findAll();
    }
    
    @Transactional
    public Product findbyId(final String productId) {
	return productRepository.findOne(productId);
    }
}
