import { Injectable } from '@angular/core';

@Injectable()
export class AppStorageService {
  private CSR_KEY: string = 'isCSR';
  private PROVIDER_IMPERSONATOR_KEY: string = 'isProviderImpersonator';
  private USER_KEY = 'user';

  constructor() { }

  public setCSRInSession(isCSR) {
    this.setItem(this.CSR_KEY, isCSR);
  }
  public getCSRFromSession(): any {
    return this.getItem(this.CSR_KEY);
  }
  public setProviderImpersonatorInSession(isProviderImpersonator) {
    this.setItem(this.PROVIDER_IMPERSONATOR_KEY, isProviderImpersonator);
  }
  public getProviderImpersonatorFromSession(): any {
    return this.getItem(this.PROVIDER_IMPERSONATOR_KEY);
  }
  public setUserInSession(loggedInUser) {
    this.setItem(this.USER_KEY, loggedInUser);
  }
  public getUserFromSession(): any {
    return this.getItem(this.USER_KEY);
  }
  public removeCSRFromSession(): any {
    this.removeItem(this.CSR_KEY);
  }
public removeProviderImpersonatorFromSession(): any {
    this.removeItem(this.PROVIDER_IMPERSONATOR_KEY);
  }
 public removeUserFromSession(): any {
    this.removeItem(this.USER_KEY);
  }
  private setItem(key,value){
    sessionStorage.setItem(key, value);
  }
  private getItem(key){
    return sessionStorage.getItem(key);
  }
  private removeItem(key){
    sessionStorage.removeItem(key);
  }
}
