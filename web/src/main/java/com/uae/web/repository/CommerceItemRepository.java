package com.uae.web.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import com.uae.web.model.CommerceItem;


public interface CommerceItemRepository extends MongoRepository<CommerceItem, String> {

	List<CommerceItem> findItemById();

}
