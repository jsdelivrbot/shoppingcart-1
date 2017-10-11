import { TestBed, inject } from '@angular/core/testing';

import { AppStorageService } from './app-storage.service';

/*describe('AppStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStorageService]
    });
  });

  it('should ...', inject([AppStorageService], (service: AppStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should call all tget methods', inject([AppStorageService], (service: AppStorageService) => {
    expect(service).toBeTruthy();
  }));
});*/


describe('AppStorageService', () => {
  let component: AppStorageService;
  
   //let msgCenterApi: any
beforeEach(() => {
  // msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['getFilterOptions', 'getMessageType', 'getMessageDetails', 'getConversationMessages']);
   component = new AppStorageService();

});

it('should create', () => {
  expect(component).toBeTruthy(true);
});

it('should call  all get functions', () => {
  component.getUserFromSession();
  component.getCSRFromSession();
  component.getProviderImpersonatorFromSession();
  component.removeCSRFromSession();
  component.removeProviderImpersonatorFromSession();
  component.removeUserFromSession();
  
});

it('should call  all set functions', () => {

  let CSR_KEY: string = 'isCSR';
  let PROVIDER_IMPERSONATOR_KEY: string = 'isProviderImpersonator';
  let USER_KEY = 'user';
  component.setCSRInSession(CSR_KEY);
  component.setProviderImpersonatorInSession(PROVIDER_IMPERSONATOR_KEY);
  component.setUserInSession(PROVIDER_IMPERSONATOR_KEY);
  
});

}); 
