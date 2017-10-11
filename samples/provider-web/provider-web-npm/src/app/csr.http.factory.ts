import {XHRBackend, Http, RequestOptions} from '@angular/http';
import { Inject } from '@angular/core';
import {CSRInterceptedHttp} from './csr.interceptor';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new CSRInterceptedHttp(xhrBackend, requestOptions);
}
