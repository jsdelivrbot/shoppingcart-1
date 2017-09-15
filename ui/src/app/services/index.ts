export * from './alert.service';
export * from './authentication.service';
export * from './user.service';

import {AlertService} from './alert.service';
import {AuthenticationService} from './authentication.service';
import {UserService} from './user.service';

import {ProductService} from './product.service';

export const SERVICES =  [
    ProductService, AlertService, AuthenticationService, UserService
]