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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uae.web.model.CommerceItem;
import com.uae.web.model.ShoppingCart;
import com.uae.web.service.ShoppingCartService;

@RestController
@RequestMapping(value="/cart/api/v1")
public class ShoppingCartController {

	@Autowired 
	private ShoppingCartService shoppingCartService;
	
	/**
	 * Returns the current shopping cart for the session.
	 * @param id
	 * @return Shoppingcart
	 */
	@RequestMapping(value = "/shoppingcart", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ShoppingCart> shoppingcartGet(){
		HttpHeaders httpHeaders = new HttpHeaders();
		ShoppingCart shoppingCart =null;// shoppingCartService.getSessionShoppingCart();
		return new ResponseEntity<ShoppingCart>(shoppingCart, httpHeaders, HttpStatus.OK);
	}
	
	/**
	 * Removes an commerce item from the shopping cart, by commerce item id.
	 * @param id
	 */
	@RequestMapping(value = "/shoppingcart/items/{id}", method = RequestMethod.DELETE, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> shoppingcartItemsIdDelete(@RequestParam(required=true) String id){
		HttpHeaders httpHeaders = new HttpHeaders();
		shoppingCartService.delete(id);
		return new ResponseEntity<>("Item was removed from the shopping cart.", httpHeaders, HttpStatus.OK);
	}
	
	/**
	 * Adds an item to the shopping cart. 
	 * @param product_id
	 * @param quantity
	 */
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/shoppingcart/items", method = RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CommerceItem> shoppingcartItemsPost(HttpSession httpSession, @RequestBody CartVo cart){
		HttpHeaders httpHeaders = new HttpHeaders();
		CommerceItem commerceItem = new CommerceItem(cart.getProduct_id(), cart.getQuantity(), cart.getAmount());
		shoppingCartService.insert(commerceItem);
		return new ResponseEntity<>(commerceItem, httpHeaders, HttpStatus.OK);
	}
	
	/**
	 * Adds an item to the shopping cart. 
	 * @param product_id
	 * @param quantity
	 */
	@RequestMapping(value = "/shoppingcart/total", method = RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Double> getTotalShoppingCartCosts(HttpSession httpSession){

		//Get shoppingcart from session 
	    	ShoppingCart shoppingCart = null;//shoppingCartService.findOne(String.valueOf(httpSession.getAttribute("cart_id")));
	    	
		HttpHeaders httpHeaders = new HttpHeaders();
		return new ResponseEntity<Double>(shoppingCart.getTotalCosts(), httpHeaders, HttpStatus.OK);

	}
}

class  CartVo{
	
	
	private String product_id;
	
	private Integer quantity;
	private Double amount;
	/**
	 * @return the product_id
	 */
	public String getProduct_id() {
		return product_id;
	}
	/**
	 * @param product_id the product_id to set
	 */
	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}
	/**
	 * @return the quantity
	 */
	public Integer getQuantity() {
		return quantity;
	}
	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	/**
	 * @return the amount
	 */
	public Double getAmount() {
		return amount;
	}
	/**
	 * @param amount the amount to set
	 */
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	
}


