package com.uae.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uae.web.model.CommerceItem;
import com.uae.web.repository.CommerceItemRepository;

@Service
public class CommerceItemService {

    @Autowired
    private CommerceItemRepository commerceItemRepository;
    
    @Transactional
    public void delete(String id){
	commerceItemRepository.delete(id);
    }
    
    @Transactional
    public void save(CommerceItem commerceItem){
	commerceItemRepository.save(commerceItem);
    }
}
