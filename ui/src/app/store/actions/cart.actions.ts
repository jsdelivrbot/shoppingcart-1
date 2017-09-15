import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


function type(action) {
  return action;
}

export const ActionTypes = {
  SEARCH:           type('[Cart] Search'),
  SEARCH_COMPLETE:  type('[Cart] Search Complete'),
  LOAD:             type('[Cart] Load'),
  SELECT:           type('[Cart] Select'),
  ADD_TO_CART:      type('[Cart] Add'),
  REMOVE_FROM_CART:      type('[Cart] Remove'),
};

@Injectable()
export class CartAction {

    constructor(private store: Store<any>,
    private http:Http) {

    }
    getState(): Observable<any> {
        return this.store.select('cart');
    }

    addToCart(product, quantity) {
        console.log('add,', product);

         this.http.post('http://localhost:9010/cart/api/v1/shoppingcart/items',         
                    {
                    "product_id":product.id,
                    "quantity":quantity,
                    "amount":10
                    },

         this.jwt())       
        .subscribe(data=>{
            console.log(data);
        });

        this.store.dispatch({
            type: ActionTypes.ADD_TO_CART,
            payload: {
                product,
                quantity
            }
    });
    }

    removeFromCart(payload) {
        console.log('remove,', payload)
        this.store.dispatch({
            type: ActionTypes.REMOVE_FROM_CART,
            payload: payload
        })
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = 
            new Headers({'Authorization': 'Bearer ' + currentUser.token ,
        'Content-Type': 'application/json'},
            );
            return new RequestOptions({ headers: headers });
        }
    }

}