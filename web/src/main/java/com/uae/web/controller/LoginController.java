package com.uae.web.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.uae.web.service.LoginService;

@RestController
@RequestMapping(value = "/sc/api/v1")
public class LoginController {

	@Autowired
	private LoginService loginService;

	/**
	 * The Products endpoint returns information about the products.
	 * @return List<Product>
	 */
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/login", method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> login(final @RequestBody UserVO user) {

		HttpHeaders httpHeaders = new HttpHeaders();
		final boolean isAuthenticated = loginService.authenticate(user.getUsername(), user.getPassword());		
		ResponseEntity response = null;
		if(isAuthenticated){
			response =  new ResponseEntity(new Token("ASDFGHJKL123$"), httpHeaders, HttpStatus.OK);
         }else {
        	 
        	 response =  new ResponseEntity("Invalid login", httpHeaders, HttpStatus.FORBIDDEN);
         }
		
		return response;
		
		
	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/logout", method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> logout(final  HttpSession session) {

		HttpHeaders httpHeaders = new HttpHeaders();
		session.invalidate();		
		return new ResponseEntity(null, httpHeaders, HttpStatus.OK);        
		
		
	}
}

class UserVO{
	
	String username;
	String password;
	
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}	
	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}	
	
}

class Token{
	
	String token;
	
	Token(String token){
		this.token = token;
	}

	/**
	 * @return the token
	 */
	public String getToken() {
		return token;
	}

	/**
	 * @param token the token to set
	 */
	public void setToken(String token) {
		this.token = token;
	}
}


