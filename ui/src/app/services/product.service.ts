import { Injectable } from '@angular/core';
import { PRODUCTS } from '../models/product-data';
import { Product } from '../models/Product'; 
import { Observable, Subject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

// The consumer of angular services doesn't know how the service gets the data. 
// This ProductService could get the data from anywhere. 
// It could get the data from a web service or local storage or from a mock data source.
// That's the beauty of removing data access from the component. 
// We can change our minds about the implementation as often as we like, for whatever reason, 
// without touching any of the components that need the data.
@Injectable()
export class ProductService {

    constructor(private http:Http) {

    }

    

    getProducts() {
        return this.http.get('http://localhost:9010/sc/api/v1/products', this.jwt())
        .map((response: Response) => response.json());
    }

    getProduct(id) {
       return this.http.get('http://localhost:9010/sc/api/v1/product/'+id, this.jwt()); 
        
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