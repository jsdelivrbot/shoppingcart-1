import {Injectable, Inject} from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {environment} from '../environments/environment';
import { AppStorageService } from './app-storage.service';
import { AppSettings } from './app-settings';
@Injectable()
export class CSRInterceptedHttp extends Http {
    private storageService: AppStorageService = new AppStorageService();
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
         super(backend, defaultOptions);
    }
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let isCSR = this.storageService.getCSRFromSession();
        let isProviderImpersonator  = this.storageService.getProviderImpersonatorFromSession();
        let user = JSON.parse(this.storageService.getUserFromSession());

        const headers = AppSettings.getHeaders();
        if (options) {
            options.headers = headers;
        }

        if (isCSR && isProviderImpersonator) {
            this.getRequestOptionArgs(options, user.userId);
        }
        options.headers.set('Content-type', 'application/json');
        return super.request(url, options);
    }
    private updateUrl(req: string) {
        return  environment.API_ENDPOINT + req;
    }
    private getRequestOptionArgs(options?: RequestOptionsArgs, userId?: string): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        /**
         * Add x-header-6 for CSR impersonating the Provider
         */
        options.headers.set('x-header-05', userId);

        return options;
    }
}
