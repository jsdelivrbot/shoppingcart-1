import { Injectable } from '@angular/core';
import * as msgCenterClient from '@tranzform/client-msgcenter/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
    private impersonatorSubject = new Subject<any>();
    private userLoggedInSubject = new Subject<any>();
    private loggedUserNameSubject = new Subject<any>();
    private iSCSRloggedUserNameSubject = new Subject<any>();
    
    constructor() { }
    /**
     * Set CSR impersonating the Provider
     */
    public setImpersonatorSubject(isProviderImpersonator: boolean, user: any) {
        this.impersonatorSubject.next({isProviderImpersonator: isProviderImpersonator, user: user});
    }
    /**
     * Get isProviderImpersonator
     */
    public getImpersonatorSubject(): any {
        return this.impersonatorSubject.asObservable();
    }
    /**
     * Clear impersonatorSubject
     */
    public clearImpersonatorSubject() {
        this.impersonatorSubject.next({isProviderImpersonator: false});
    }
    /**
     * Set CSR impersonating the Provider
     */
    public setUserLoggedInSubject(isuserLoggedIn: boolean) {
        this.userLoggedInSubject.next({isProviderImpersonator: isuserLoggedIn});
    }
    /**
     * Get isProviderImpersonator
     */
    public getUserLoggedInSubject(): any {
        return this.userLoggedInSubject.asObservable();
    }
    /**
     * Clear impersonatorSubject
     */
    public clearUserLoggedInSubject() {
        this.userLoggedInSubject.next({isProviderImpersonator: false});
    }
    /**
     * Set CSR impersonating the Provider
     */
    public setLoggedUserName(userLoggedUserName: any) {
        this.loggedUserNameSubject.next({username: userLoggedUserName});
    }
    /**
     * Get isProviderImpersonator
     */
    public getLoggedUserName(): any {
        return this.loggedUserNameSubject.asObservable();
    }
    /**
     * Clear impersonatorSubject
     */
    public clearLoggedUserName() {
        this.loggedUserNameSubject.next({username: ''});
    }
    
     /**
     * Set CSR impersonating the Provider
     */
    public setISCSR(isCSR: boolean) {
        this.iSCSRloggedUserNameSubject.next({isCSR: isCSR});
    }
    /**
     * Get isProviderImpersonator
     */
    public getISCSR(): any {
        return this.loggedUserNameSubject.asObservable();
    }
    /**
     * Clear impersonatorSubject
     */
    public clearISCSR() {
        this.loggedUserNameSubject.next({isCSR: false});
    }
}
