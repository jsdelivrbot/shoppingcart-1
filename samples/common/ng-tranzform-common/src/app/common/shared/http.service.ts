import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions, XHRBackend } from '@angular/http';

import { ConfigModule } from './config.constant';
import { TzfTranslateService } from './translate.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthorizationService } from '../security';

export function HttpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

@Injectable()
export class HttpService extends Http {
  public appConfig = new ConfigModule();

  private authService = AuthorizationService.instance();

  private getHeaders(existingHeaders?: Headers): Headers {
    return this.authService.getHeaders(existingHeaders);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let headers: Headers;

    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = { headers: new Headers() };
      }
      headers = this.getHeaders(options.headers);
    } else {
      // we have to add the token to the url object
      headers = url.headers = this.getHeaders(url.headers);
    }

    headers.set(this.appConfig.X_HEADER_PREFERRED_LANGUAGE, TzfTranslateService.currentLang);

    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.warn(res);
      }
      return Observable.throw(res);
    };
  }
}
