import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateService } from '@ngx-translate/core';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { AppStorageService } from './app-storage.service';
import { Logger } from 'angular2-logger/core';
import { AppService } from './app.service';
import { ShellService } from '@tranzform/common/shell/shell.service';
import { Router, ActivatedRoute, Params, NavigationEnd  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageConfigModule as MSG_CONST } from './messages/message-constant';
import { Headers } from '@angular/http';
import { AuthService } from './shared/authenticate/auth.service';
describe('AppComponent', () => {
  let component: AppComponent;
  let storageService: any;
  let messageCenterApi: any;
  let log: any;
  let appService: any;
  let shellService: any;

  let route: any;
  let router: any;
  let http: any;
  let translate: any;
  let authService: any;
  beforeEach(() => {
      translate = jasmine.createSpyObj('translate', ['setDefaultLang', 'use', 'get']);
      router = jasmine.createSpyObj('router', ['navigate']);
      messageCenterApi = jasmine.createSpyObj('messageCenterApi', ['saveConversation', 'getConversationMessages']);
      log = jasmine.createSpyObj('log', ['info', 'debug', 'error']);
      appService = jasmine.createSpyObj('appService', ['getImpersonatorSubject', 'clearImpersonatorSubject']);
      shellService = jasmine.createSpyObj('shellService', ['messageCount']);

      route = {queryParams : Observable.of({})};
      authService = jasmine.createSpyObj('authService', ['checkLoggedInUser', 'startSignoutMainWindow']);
      storageService = jasmine.createSpyObj('storageService', [
          'getCSRFromSession', 'getProviderImpersonatorFromSession',
          'getUserFromSession', 'setCSRInSession', 'setProviderImpersonatorInSession', 'setUserInSession',
          'removeCSRFromSession', 'removeUserFromSession', 'removeProviderImpersonatorFromSession'
        ]
      );

      authService = jasmine.createSpyObj('shellService', ['messageCount']);
      appService.getImpersonatorSubject.and.returnValue(Observable.create(obsercer => {
        obsercer.next({
          isProviderImpersonator: false,
          user: null/* {'userLastName': 'M',
                  'userFirstName': 'Robert',
                  'userId': 'PR001'
                } */
        });
       })
      );
      component = new AppComponent(translate,
        messageCenterApi,
        shellService, authService, route, router, appService, http,
        storageService, log
      );
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should set user context', () => {
      let userObj = {
          'userId': 'PR001',
          'userLastName': 'M',
          'userFirstName': 'John'
      };
      translate.get.and.returnValue(Observable.create(observer => {
        observer.next('CSR.PROVIDERVIEWFOR');
      }));
      component.setUserContext(userObj);
    });
    it('should set isCSR to true', () => {
      route.queryParams = Observable.of({q: true});
      component.ngOnInit();
      expect(component['isCSR']).toBeTruthy();
    });
    it('ngAfterViewInit', () => {
      component.ngAfterViewInit();
    });
    it('should navigate to inbox', () => {
      component.openInbox('inbox');
    });
    it('should get unread message count', () => {
      messageCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next([
          {
            'metaInfo': {
              'orderBy': 'desc',
              'sortBy': 'modifiedDate',
              'type': 'inbox',
              'unReadCount': '2',
              'totalCount': '2'
            },
            'messages': [
              {
                'conversationId': 'CONV1193',
                'conversationCategory': 'General',
                'subject': 'inbox2',
                'messageId': 'MSG1812',
                'messageBody': '',
                'messageStatus': 'ACTIVE',
                'createdDate': '07/14/2017 06:17:36',
                'modifiedDate': '07/14/2017 06:17:36',
                'readIndicator': false,
                'isFwd': false,
                'recipients': [
                  {
                    'recipientId': 'M1001@tranzform.com',
                    'recipientName': 'Elliot M Reid',
                    'recipientUserType': 'PROVIDER'
                  }
                ]
              },
              {
                'conversationId': 'CONV1194',
                'conversationCategory': 'General',
                'subject': 'inbox1',
                'messageId': 'MSG1813',
                'messageBody': '',
                'messageStatus': 'ACTIVE',
                'createdDate': '07/14/2017 06:17:36',
                'modifiedDate': '07/14/2017 06:17:36',
                'readIndicator': false,
                'isFwd': false,
                'recipients': [
                  {
                    'recipientId': 'M1001@tranzform.com',
                    'recipientName': 'Elliot M Reid',
                    'recipientUserType': 'PROVIDER'
                  }
                ]
              }
            ],
            'statusInfo': null
          }
        ]);
      }));
      component.inboxUnReadService();
        let paramConversiosation = {
        'type': MSG_CONST.TYPE_INBOX,
        'sortby': MSG_CONST.MODIFIED_DATE, 'orderby': MSG_CONST.MSG_ORDER_DESC,
        'readindicator': 'UNREAD'
      };
      expect(messageCenterApi.getConversationMessages).toHaveBeenCalledWith(paramConversiosation, {
        headers: new Headers(jasmine.any(Object))
      });
    });
    it('should exit from provider view', () => {
      component.exitProviderView();
      expect(component['context']).toBe('');
    });
});
