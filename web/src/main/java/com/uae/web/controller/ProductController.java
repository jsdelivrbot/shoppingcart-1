package com.uae.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.uae.web.model.Product;
import com.uae.web.service.ProductService;

@RestController
@RequestMapping(value = "/sc/api/v1")
public class ProductController {

	@Autowired
	private ProductService productService;

	/**
	 * The Products endpoint returns information about the products.
	 * @return List<Product>
	 */
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/products", method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Product>> productsGet() {

		HttpHeaders httpHeaders = new HttpHeaders();
		List<Product> products = productService.findAll();
		
		return new ResponseEntity<List<Product>>(products, httpHeaders, HttpStatus.OK);
	}
	
	
	/**
	 * The Products endpoint returns information about the products.
	 * @return List<Product>
	 */
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/product/{productId}", method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Product> productsbyId(@PathVariable  String productId) {

		HttpHeaders httpHeaders = new HttpHeaders();
		Product product = productService.findbyId(productId);
		
		return new ResponseEntity<Product>(product, httpHeaders, HttpStatus.OK);
	}
}
