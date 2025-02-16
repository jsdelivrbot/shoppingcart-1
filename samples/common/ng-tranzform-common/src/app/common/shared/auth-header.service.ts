import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigModule } from './config.constant';
import { AppConstants } from './constants';
import { MemberContext } from './member-context.service';

@Injectable()
export class AuthHeaderService {
  public appConfig = new ConfigModule();
  public appConstants = new AppConstants();

  private memberContext = new MemberContext(); // Todo: Figure out how to inject this.

  constructor(private http: Http) {
  }

  getHeaders (): Observable<Response> {
    return this.http.get('https://localhost:7878/' + this.appConstants.authContextPath + '/context.js');
  }

  setHeaders () {
    const authRequest = this.getHeaders().subscribe(res => {
      this.assignHeadersToMemberContext(res.headers);
    });
  }

  setFakeHeaders () {
    this.memberContext.setItem(this.appConfig.X_HEADER_TENANT_UUID, 'bf862bc3-a893-4af9-9bbe-d8d9892ff977');
    this.memberContext.setItem(this.appConfig.X_HEADER_JSESSIONID, 'AQAbBfz83k8+AtCbCjBis3C4ahZglpKIURmppoT8yIKl+EHfQ0Ibv15hHqtNv5zyiblD61lqw/JPz7mJDT4bzJ2Fal/73e6oGt0dV0JGBrzh7E2z7yGxskhde9anTN8gxVfbOulLre5bnnJ/5IaWn+97ylK5FjpJ+k+mjy92l3OgBOx1gadM64SzIKkagzQ/NPM7qkAEQ6TGMgqkEsla1kYaxxGjJqPyCR5p9CdoD1dsFeQjoKnu/7qHbT/VBkpSfgDWm6PUX14l7eo48dugzE2CsMhlZ+/+AhirSNP4ip28eOL1YkVs/6+OM7+DgXmBZXEtSU1OtKViHt7MXHgv4jpJZ2EWL6lJmeY43xwkU+Ma8Jp4Ltnfj3IB1zoniKCigMnIe5FgE9+zLg3jYaRqubA4xcLX4vp0/Ze6yva9937Dow=='); // tslint:disable-line:max-line-length
    this.memberContext.setItem(this.appConfig.X_HEADER_AUTH_TOKEN, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJUWkYiXSwiZXhwIjoxNDg3Njg3MDAyLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMzc4ZTBjMGUtZDAyNy00MmNmLTg5MDQtYTFmMDk4NTA4ZGIzIiwiY2xpZW50X2lkIjoiYmY4NjJiYzMtYTg5My00YWY5LTliYmUtZDhkOTg5MmZmOTc3In0.3Lf233jMXlDx7D6wTKIxSSO3iy9x3jU3ZTsOxEBeO-s'); // tslint:disable-line:max-line-length
    this.memberContext.setItem(this.appConfig.X_HEADER_PREFERRED_LANGUAGE, 'en');
  }

  private assignHeadersToMemberContext(authRequest): void {
    this.memberContext.setItem(this.appConfig.X_HEADER_TENANT_UUID, authRequest.get(this.appConfig.X_HEADER_TENANT_UUID));
    this.memberContext.setItem(this.appConfig.X_HEADER_JSESSIONID, authRequest.get(this.appConfig.X_HEADER_JSESSIONID));
    this.memberContext.setItem(this.appConfig.X_HEADER_AUTH_TOKEN, authRequest.get(this.appConfig.X_HEADER_AUTH_TOKEN));
    this.memberContext.setItem(this.appConfig.X_HEADER_PREFERRED_LANGUAGE, authRequest.get(this.appConfig.X_HEADER_PREFERRED_LANGUAGE));
  }
}
