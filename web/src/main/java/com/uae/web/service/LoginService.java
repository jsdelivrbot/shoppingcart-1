package com.uae.web.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoginService {
    
   

    @Transactional
    public boolean authenticate(final String username , final String password) {
	return   (username.equals("admin") && password.equals("admin"));
    }
}
