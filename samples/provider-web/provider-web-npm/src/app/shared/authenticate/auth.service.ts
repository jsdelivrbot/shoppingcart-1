import { Injectable, Input, EventEmitter,ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserManager, User } from 'oidc-client';
import { AppSettings } from './../../app-settings';
import { AppStorageService } from './../../app-storage.service';
import { AppService } from './../../app.service';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AuthService {

  // get the ref of the modal dialog
  @Input() modalRef: NgbModalRef;

  production: any;
  oidc_settings: any;
  user_settings: any;
  mgr: UserManager;
  userLoadededEvent: EventEmitter<User>;
  currentUser: User;
  loggedIn = false;
  authHeaders: Headers;


  constructor(private http: Http,
    private router: Router,
    private appSettings: AppSettings,
    private storageService: AppStorageService,
    private appService: AppService,
    private modalService: ModalService,
    private translate: TranslationService) {

    this.production = AppSettings.PROD_MODE;
    this.oidc_settings = AppSettings.OIDC_SETTINGS;
    this.user_settings = AppSettings.USER_SETTINGS;
    this.mgr = new UserManager(this.oidc_settings);
    this.userLoadededEvent = new EventEmitter<User>();

    
    this.mgr.getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.setHeaders();
          this.setUserDetail(user);
          this.userLoadededEvent.emit(user);
          if (document.getElementById('user-name')) {
            document.getElementById('user-name').innerHTML = this.currentUser.profile.tzfusername;
          }
        } else {
          this.loggedIn = false;
        }
      })
      .catch((err) => {
        this.loggedIn = false;
      });

    this.mgr.events.addUserLoaded((user) => {
      this.currentUser = user;
       this.setHeaders();
      this.loggedIn = !(user === undefined);
      if (!this.production) {
        console.log('authService addUserLoaded', user);
      }

    });

    this.mgr.events.addUserUnloaded((e) => {
      if (!this.production) {
        console.log('user unloaded');
      }
      this.loggedIn = false;
    });

     this.mgr.events.addAccessTokenExpired((e) => {
      if (!this.production) {
        console.log('token expired');
      }
      this.loggedIn = false;
      this.sessionExpiredWarning();
     
      
    });


  }

  setHeaders() {
    console.log("The Current LoggedIn User Context: " + JSON.stringify(this.currentUser));
    if (this.currentUser != undefined &&
      this.currentUser != null) {
      let auth_token = this.currentUser.access_token;
      if (this.appSettings.angularHeaders.get('Authorization') == undefined) {
        this.appSettings.angularHeaders.append('Authorization', 'Bearer ' + auth_token);
      } else {
        this.appSettings.angularHeaders.set('Authorization', 'Bearer ' + auth_token);
      }
      AppSettings.getHeaders().set('Authorization', 'Bearer ' + auth_token);
      console.log(AppSettings.getHeaders());
    }
  }

  isLoggedInObs(): Observable<boolean> {
    return Observable.fromPromise(this.mgr.getUser()).map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }

  clearState() {
    this.mgr.clearStaleState().then(function () {
      console.log('clearStateState success');
    }).catch(function (e) {
      console.log('clearStateState error', e.message);
    });
  }

  getUser() {
    this.mgr.getUser().then((user) => {
      this.currentUser = user;
      console.log('got user', user);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.userLoadededEvent.emit(null);
      console.log('user removed');
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSigninMainWindow() {
    this.mgr.signinRedirect({ data: 'some data' }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });
  }
  endSigninMainWindow() {
    this.mgr.signinRedirectCallback().then(function (user) {
      console.log('signed in', user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSignoutMainWindow() {
    this.mgr.getUser().then(user => {
      return this.mgr.signoutRedirect({ id_token_hint: user.id_token }).then(resp => {
        console.log('signed out', resp);
        setTimeout(5000, () => {
          console.log('testing to see if fired...');
        });
      }).catch(function (err) {
        console.log(err);
      });
    });
  };

  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err);
    });
  };
  /**
   * Example of how you can make auth request using angulars http methods.
   * @param options if options are not supplied the default content type is application/json
   */
  AuthGet(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.get(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

    let body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.put(url, body, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    }
    else {
      options = this._setRequestOptions();
    }
    return this.http.delete(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

    let body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }
    return this.http.post(url, body, options);
  }


  private _setAuthHeaders(user: any): void {
    this.authHeaders = new Headers();
    this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
    if (this.authHeaders.get('Content-Type')) {

    } else {
      this.authHeaders.append('Content-Type', 'application/json');
    }
  }
  private _setRequestOptions(options?: RequestOptions) {
    if (this.loggedIn) {
      this._setAuthHeaders(this.currentUser);
    }
    if (options) {
      options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
    } else {
      options = new RequestOptions({ headers: this.authHeaders });
    }

    return options;
  }
  
setUserDetail(user){
   if (user) {
        this.appService.setLoggedUserName(this.currentUser.profile.tzfusername);
        if (document.getElementById('user-name')) {
          document.getElementById('user-name').innerHTML = this.currentUser.profile.tzfusername;
        }
        if (user.profile.tzfroles === 'CSR') {
          this.storageService.setCSRInSession(true);
          this.appService.setISCSR(true);
        }
 }
}
  returnUserObj() {
    this.mgr.getUser().then((user) => {
      return user;
    });
  }

  sessionExpiredWarning() {
    console.log('sessionExpiredWarning Started...');
    let confirmMsgBody: string;
    let confirmTitle: string;
    let yes: string;
    let no: string;

    confirmTitle=this.translate.getInstantText('SESSIONEXPIRED.CONFIRMATION_TITLE');
    confirmMsgBody=this.translate.getInstantText('SESSIONEXPIRED.CONFIRMATION_LABEL');    
    yes = this.translate.getInstantText('SESSIONEXPIRED.YES');
    no = this.translate.getInstantText('SESSIONEXPIRED.NO');

    this.modalService.confirm({
      headerText: confirmTitle,
      message: [
        confirmMsgBody
      ],
      cancelText: no,
      okText: yes,
    })
      .then(
      () => {
        console.log('Confirmed invoking log out');
        /** invoke the draft service to save*/
         this.storageService.removeProviderImpersonatorFromSession();
         this.appService.clearImpersonatorSubject();
         this.storageService.removeCSRFromSession();
         this.storageService.removeUserFromSession();
         this.startSignoutMainWindow();
       // this.modalRef.close();
      },
      () => {
        console.log('Not confirmed');
      }
      );
    console.log('Token Expired warning Finished...');
  }

}



