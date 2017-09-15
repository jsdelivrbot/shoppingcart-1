package com.uae.web.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import com.uae.web.model.ShoppingCart;


public interface ShoppingCartRepository extends MongoRepository<ShoppingCart, String> {

}
