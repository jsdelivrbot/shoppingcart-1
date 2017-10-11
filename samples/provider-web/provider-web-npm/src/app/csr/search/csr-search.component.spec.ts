import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSRSearchComponent } from './csr-search.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CSRConfigModule as CSR_CONST } from './../csr-constant';
import { CsrSearchForm } from './csr-search.model';
import { ProviderApi } from '@tranzform/client-msprovider';
import { Router } from '@angular/router';
import { AppStorageService } from '../../app-storage.service';
import { AppService } from '../../app.service';
describe('CSR Search ModalComponent', () => {
  let component: CSRSearchComponent;
  let log: any;
  let providerApi: ProviderApi;
  let appService: AppService;
  let router: Router;
  let storageService: AppStorageService;
  beforeEach(() => {
    log = jasmine.createSpyObj('log', ['info']);
    appService = jasmine.createSpyObj('appService', ['setImpersonatorSubject']);
    router = jasmine.createSpyObj('router', ['navigate']);
    storageService = jasmine.createSpyObj('storageService', [
          'getCSRFromSession', 'getProviderImpersonatorFromSession',
          'getUserFromSession', 'setCSRInSession', 'setProviderImpersonatorInSession', 'setUserInSession',
          'removeCSRFromSession', 'removeUserFromSession', 'removeProviderImpersonatorFromSession'
        ]
      );
    component = new CSRSearchComponent(log, providerApi, appService, router, storageService);
    providerApi = jasmine.createSpyObj('providerApi', ['usersGet']);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the search', () => {
    log.info.and.returnValue('');
    component.model = new CsrSearchForm('shiv', 'guru', '123');
    component.resetSearchForm();
    expect(component.model.firstName).toEqual('');
    expect(component.model.lastName).toEqual('');
    expect(component.model.userId).toEqual('');
  });

  it('should enable the search form for User ID', () => {
    log.info.and.returnValue('');
    component.ngOnInit();
    component.selectedValue = CSR_CONST.SEARCHBY_USERID;
    component.model = new CsrSearchForm('', '', '123');
    component.enableSearch(component.model.userId, '', '');
    expect(component.resetBtnVisible).toBeTruthy();
    expect(component.searchBtnEnable).toBeFalsy();
  });

  it('should disable the search form', () => {
    log.info.and.returnValue('');
    component.ngOnInit();
    component.selectedValue = CSR_CONST.SEARCHBY_USERID;
    component.model = new CsrSearchForm('', '', '');
    component.enableSearch(component.model.userId, '', '');
    expect(component.resetBtnVisible).toBeFalsy();
    expect(component.searchBtnEnable).toBeTruthy();
  });

  it('should enable the search form For First name and last NAme', () => {
    log.info.and.returnValue('');
    component.ngOnInit();
    component.selectedValue = CSR_CONST.SEARCHBY_NAME;
    component.model = new CsrSearchForm('Ayon', 'M', '');
    component.enableSearch('', component.model.firstName, component.model.lastName);
    expect(component.resetBtnVisible).toBeTruthy();
    expect(component.searchBtnEnable).toBeFalsy();
  });

  it('should disable the search form For First name and last NAme', () => {
    log.info.and.returnValue('');
    component.ngOnInit();
    component.selectedValue = CSR_CONST.SEARCHBY_NAME;
    component.resetBtnVisible = true;
    component.searchBtnEnable = false;
    component.model = new CsrSearchForm('', '', '');
    component.enableSearch('', component.model.firstName, component.model.lastName);
    expect(component.resetBtnVisible).toBeFalsy();
    expect(component.searchBtnEnable).toBeTruthy();
  });

   it('should fetch result based on search criteria', () => {
    const userType = 'PROVIDER';
    const username = 'PR006';
    const userfirstname = 'Lisa';
    const userlastname = 'Cuddy';
    const sortby = 'userlastname';
    const orderby = 'ASC';
    const pagenumber = '1';
    const pagesize = '10';
    component.searchProvider();
    expect(providerApi.providerUsersGet).toHaveBeenCalledWith(
      {'usertype': userType,
      'username': username,
      'userfirstname': userfirstname,
      'userlastname': userlastname,
      'sortby': sortby,
      'orderby': orderby,
      'pagenumber': pagenumber,
      'pagesize': pagesize},
      { headers: new Headers(jasmine.any(Object)) });
    expect(component.providerSearchResult.userList[0].userId).toBe('PR006');
  });
  it('should navigate to provider view', () => {
     let provider = {
      userId: 'PR001',
      userLastName: 'M',
      userFirstName: 'Jhon'
    };
    component['providerView'](provider);
  });
});
