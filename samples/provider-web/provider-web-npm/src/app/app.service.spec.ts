import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';

describe('TestService', () => {
     let service;
    beforeEach(() => {
     service = new AppService();
    });
    it('should set impersonatorsubject', () => {
        let userObj = {'userId':'PR001', 'userLastName':'M', 'userFirstName': 'John'};
        service.setImpersonatorSubject(true, userObj);
    });
    it('should get impersonatorsubject', () => {
       service.getImpersonatorSubject();
    });
     it('should clear impersonatorsubject', () => {
       service.clearImpersonatorSubject();
    });
});
