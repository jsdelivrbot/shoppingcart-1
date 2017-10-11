import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { tzfCommonEnvironment as environment } from '../environment';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

const settings: UserManagerSettings = {
  authority: 'https://healthtranzformidentity.healthtranzform.com',
  client_id: '@!7625.8353.6A3F.2694!0001!9FBC.AB68!0008!BC66.E6DD.D362.5EC7',
  redirect_uri: 'http://localhost:4200/auth.html',
  post_logout_redirect_uri: 'http://localhost:4200/logout.html',
  response_type: 'id_token token',
  scope: 'openid email roles',

  silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
  automaticSilentRenew: true,
  // silentRequestTimeout:10000,

  filterProtocolClaims: true,
  loadUserInfo: true
};

// This is not an Angular service since it needs to be initialized before the app is bootstrapped
export class AuthorizationService {
  private static _instance: AuthorizationService;

  private userManager: UserManager;
  private user: User;

  public static instance () {
    return this._instance || (this._instance = new AuthorizationService());
  }

  private constructor (
  ) {
    // This uses the object from oidc-client.min.js so oidc-client isn't made a dependency and included in the app bundle
    const Oidc = (<any>window).Oidc;

    // Oidc is not available during tests.
    if (Oidc && !environment.mockAuthHeaders) {
      this.userManager = new Oidc.UserManager(settings);
    }
  }

  public signedIn () {
    let ready: Subscriber<void>;

    function notifyReady () {
      ready.next();
      ready.complete();
    }

    if (environment.mockAuthHeaders) {
      setTimeout(notifyReady);
    } else {
      this.userManager.getUser()
        .then(user => {
          if (user) {
            console.log(user);
            this.user = user;
            notifyReady();
          } else {
            this.userManager.signinRedirect()
              .catch(err => {
                console.error(err);
              });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }

    return new Observable<void>(observer => ready = observer);
  }

  public signOut () {
    this.userManager.signoutRedirect();
  }

  public getHeaders (headers = new Headers()) {
    const mockHeaders = environment.mockAuthHeaders;

    if (mockHeaders) {
      for (const header in mockHeaders) { // tslint:disable-line:forin
        headers.set(header, mockHeaders[header]);
      }
    }

    return headers;
  }
}
