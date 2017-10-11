import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InitService } from './../init/init.service';
import { AuthService } from './../authenticate/auth.service';
import { Observable } from 'rxjs/Observable';
import { AppService } from './../../app.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private initService: InitService,
        private authService: AuthService,
        private appService: AppService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('Inside auth guard')
        let isUserLoggedIn = this.authService.isLoggedInObs();
        //let isUserLoggedIn = Observable.of(true);
        isUserLoggedIn.subscribe((loggedin) => {
            if (!loggedin) {
                this.router.navigate(['unauthorized']);
            } else {
                this.appService.setUserLoggedInSubject(loggedin);
            }
        });
        return isUserLoggedIn;
    }


}
