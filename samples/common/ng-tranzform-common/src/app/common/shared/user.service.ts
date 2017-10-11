import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/first';

import { TranslateService } from '@ngx-translate/core';

import { WebAuthenticationApi, UserInfoVO } from '@tranzform/client-auth';

/**
 * Load and cache user info.
 */
@Injectable()
export class UserService {
  private _user: UserInfoVO;

  private readySubject = new ReplaySubject<UserInfoVO>(1);

  constructor(
    webAuthApi: WebAuthenticationApi,
    translate: TranslateService,
  ) {
    webAuthApi.getUserDetails().subscribe(user => {
      this._user = user;
      translate.use(user.language.substring(0, 2));
      this.readySubject.next(user);
    });
  }

  public get user () {
    return this._user;
  }

  /**
   * An observable that will notify when user info is available.
   */
  public get ready () {
    return this.readySubject.asObservable().first();
  }
}
