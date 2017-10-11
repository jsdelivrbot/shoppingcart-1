import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeMailModalComponent } from './compose-mail.component';
import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Headers } from '@angular/http';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComposeMail } from './composemail.model';
import * as mdmClient from '@tranzform/client-mdm/index';
import { MessageConfigModule as MSG_CONST } from '../message-constant';
import { Subject } from 'rxjs/Subject';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import * as msProviderClient from '@tranzform/client-msprovider/index';
import { Logger } from 'angular2-logger/core';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { MessagesService } from '../messages.service';
/*
describe('ComposeMailModalComponent', () => {
  let component: ComposeMailModalComponent;
  let fixture: ComponentFixture<ComposeMailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeMailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeMailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/


describe('ComposeMailModalComponent', () => {
  let component: ComposeMailModalComponent;
  const router: any = null;
  let mdmApi: any;
  let msgCenterApi: any;
  let msProviderClientApi: any;
  let modalService: any;
  let translate: any = null;
  let log: any;
  let messageService: any;

  beforeEach(() => {
    mdmApi = jasmine.createSpyObj('mdmApi', ['getCategories']);
    msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['saveConversation','getConversationMessages']);
    msProviderClientApi = jasmine.createSpyObj('msProviderClientApi', ['usersGet','providerUsersGet']);
    modalService = jasmine.createSpyObj('modalService', ['confirm']);
    translate = jasmine.createSpyObj('translate', ['getText']);
    log = jasmine.createSpyObj('log', ['info']);
    messageService = jasmine.createSpyObj('messageService', ['setInfoMessage','setDraftBadge', 'setErrorMessage']);
    component = new ComposeMailModalComponent(
      mdmApi,
      msgCenterApi,
      modalService,
      translate,
      msProviderClientApi,
      messageService,
      log);

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('categories list', () => {
    it('should get categories list', () => {

      mdmApi.getCategories.and.returnValue(Observable.create(observer => {
        observer.next(
          [
            {
              'category': 'providerCategories',
              'data': [
                {
                  'code': 'GENERAL',
                  'value': 'General'
                },
                {
                  'code': 'BENEFITS',
                  'value': 'Benefits'
                }
              ],
              'createdBy': 'Admin',
              'createdDate': '11/23/2016',
              'modifiedDate': '11/23/2016',
              'active': true
            }
          ]
        );
      }));

      const categoryVal = 'providerCategories';

      //component.getCategories(categoryVal);
      component.ngOnInit();

      expect(mdmApi.getCategories).toHaveBeenCalledWith({ category: categoryVal },
        { headers: new Headers(jasmine.any(Object)) });

      expect(component.categories[0].data[0].code).toBe('GENERAL');
    });

  });


  describe('validateSubject', () => {

    it('should subject is valid', () => {

      component.validateMsgText('hello', true);

      expect(component.msgSubjectInvalid).toBeFalsy();
    });

    it('should subject is inValid', () => {

      component.validateMsgText('<hello>', true);

      expect(component.msgSubjectInvalid).toBeTruthy();
    });

    it('should subject is inValid by using asterisk', () => {

      component.validateMsgText('<hello*', true);

      expect(component.msgSubjectInvalid).toBeTruthy();
    });

  });

  describe('validateMessageBody', () => {

    it('should message body is valid', () => {

      component.validateMsgText('world is not enough', false);

      expect(component.msgBodyInvalid).toBeFalsy();
    });

    it('should message body is inValid', () => {

      component.validateMsgText('<world>', false);

      expect(component.msgBodyInvalid).toBeTruthy();
    });

    it('should message body is inValid by using asterisk', () => {

      component.validateMsgText('<world*', false);

      expect(component.msgBodyInvalid).toBeTruthy();
    });

  });


  describe('composeMail', () => {

    it('should send the compose mail', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);

      log.info.and.returnValue('');

      component.currentComposeMail();

      msgCenterApi.saveConversation.and.returnValue(Observable.create(observer => {
        observer.next({ status: 204 });
      }));

      const SEND_MESSAGE_SUCCESSFUL: String = 'Message sent successfully.';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(SEND_MESSAGE_SUCCESSFUL);
      }));

      const model: ComposeMail = new ComposeMail('General',
        'Test Message',
        'Hello angular world');
      component.model = model;
      component.composeMail();

      expect(msgCenterApi.saveConversation).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_SEND),
        { headers: new Headers(jasmine.any) });

      expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': SEND_MESSAGE_SUCCESSFUL });

    });
    it('should display an error message', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);

      log.info.and.returnValue('');

      component.currentComposeMail();

      msgCenterApi.saveConversation.and.returnValue(Observable.throw('error'));

      const SEND_MESSAGE_ERROR: String = 'The system encountered an error. Please try to send it again later';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(SEND_MESSAGE_ERROR);
      }));

      const model: ComposeMail = new ComposeMail('General',
        'Test Message',
        'Hello angular world');
      component.model = model;
      component.composeMail();

      expect(msgCenterApi.saveConversation).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_SEND),
        { headers: new Headers(jasmine.any) });

      expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': SEND_MESSAGE_ERROR });

    });
    it('should Save as Drafts', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);

      log.info.and.returnValue('');

      component.currentComposeMail();

      msgCenterApi.saveConversation.and.returnValue(Observable.create(observer => {
        observer.next({ status: 204 });
      }));

      const DRAFT_MESSAGE_SUCCESSFUL: String = 'Message saved successfully to Drafts folder.';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(DRAFT_MESSAGE_SUCCESSFUL);
      }));
 msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
      observer.next({
	"metaInfo": {
		"orderBy": "desc",
		"sortBy": "modifiedDate",
		"type": "inbox",
		"unReadCount": "1",
		"totalCount": "1"
	}
});
    }));
      const model: ComposeMail = new ComposeMail('General',
        'Test Message',
        'Hello angular world');
      component.model = model;
      
      component.saveToDrafts();

      expect(msgCenterApi.saveConversation).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_DRAFT),
        { headers: new Headers(jasmine.any) });

      //expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': DRAFT_MESSAGE_SUCCESSFUL , 'type': 'draft'});

    });
    it('should dispaly an error message on save as Drafts fail', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);

      log.info.and.returnValue('');

      component.currentComposeMail();

      msgCenterApi.saveConversation.and.returnValue(Observable.throw('error'));

      const DRAFT_MESSAGE_ERROR: String = 'The system encountered an error.';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(DRAFT_MESSAGE_ERROR);
      }));
      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
            observer.next({
        "metaInfo": {
          "orderBy": "desc",
          "sortBy": "modifiedDate",
          "type": "inbox",
          "unReadCount": "1",
          "totalCount": "1"
        }
      });
    }));
      const model: ComposeMail = new ComposeMail('General',
        'Test Message',
        'Hello angular world');
      component.model = model;
      
      component.saveToDrafts();

      expect(msgCenterApi.saveConversation).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_DRAFT),
        { headers: new Headers(jasmine.any) });

      //expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': DRAFT_MESSAGE_SUCCESSFUL , 'type': 'draft'});

    });
  });

  describe('confirm dialog', () => {

    it('should open the confirm dialog', () => {


      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);

      modalService.confirm.and.returnValue(new Promise((resolve, reject) => {}));
      

      component.model.message = 'Hello world';

      const confirmMsg: String = 'Yes';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(confirmMsg);
      }));

      log.info.and.returnValue('');

      component.currentComposeMail();
      component.openConfirm();

      expect(modalService.confirm).toHaveBeenCalled();

    });

  });

  describe('open Draft  dialog', () => {

    it('should open the Draft confirm dialog', () => {


      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);

      modalService.confirm.and.returnValue(new Promise((resolve, reject) => {}));

      component.model.message = 'Hello world';

      const confirmMsg: String = 'Yes';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(confirmMsg);
      }));

      log.info.and.returnValue('');

      component.currentComposeMail();
      component.draftConfirm();

      expect(modalService.confirm).toHaveBeenCalled();

    });

  });
  describe('user categories list', () => {
    it('should get user categories list', () => {
      mdmApi.getCategories.and.returnValue(Observable.create(observer => {
        observer.next([
          {
            'category': 'userCategories',
            'data': [
              {
                'code': 'PAYER',
                'value': 'Payer'
              },
              {
                'code': 'PROVIDER',
                'value': 'Provider'
              },
              {
                'code': 'ADMIN',
                'value': 'Staff'
              }
            ],
            'createdBy': 'Admin',
            'createdDate': '11/23/2016',
            'modifiedDate': '11/23/2016',
            'active': true
          }
        ]);
      }));
      const categoryVal = 'userCategories';
      component.getUserCategories(categoryVal);
      expect(mdmApi.getCategories).toHaveBeenCalledWith({'category': categoryVal},
        { headers: new Headers(jasmine.any(Object)) });
      expect(component.messageForList[0].data[0].code).toBe('PAYER');
    });
  });

  describe('User list', () => {
   it('should get user list', () => {
    msProviderClientApi.providerUsersGet.and.returnValue(Observable.create(observer => {
      observer.next([
      {
          'tenantId': 'tenant1',
          'userId': 'PR002',
          'userFirstName': 'Mark',
          'userLastName': 'M',
          'userType': 'PROVIDER',
          'mappingId': '99887767'
      },
      {
          'tenantId': 'tenant1',
          'userId': 'PR001',
          'userFirstName': 'Robert',
          'userLastName': 'Smith',
          'userType': 'PROVIDER',
          'mappingId': '99887766'
      }
    ]); }) );
    const userType = 'PROVIDER';
    component.getUserList(userType);
    expect(msProviderClientApi.providerUsersGet).toHaveBeenCalledWith({'usertype': userType},
      { headers: new Headers(jasmine.any(Object)) });
    expect(component.sendToList[0].value).toBe('Mark M');
   });
  });
});
