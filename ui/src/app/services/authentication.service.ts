import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private router: Router) { }

    login(username: string, password: string) {
        return this.http.post('http://localhost:9010/sc/api/v1/login',
         JSON.stringify({ username: username, password: password }),this.jwt())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if ( user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out

         this.http.post('http://localhost:9010/sc/api/v1/logout',{},
          this.jwt()).subscribe((response: Response) => 
        {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login'], { queryParams: { returnUrl: 'home/product' }});
           });
        
        
    }

    private jwt() {
        // create authorization header with jwt token
        
        //if (currentUser && currentUser.token) {
            let headers = new Headers({'Content-type':'application/json'});
            return new RequestOptions({ headers: headers });
        //}
    }
}