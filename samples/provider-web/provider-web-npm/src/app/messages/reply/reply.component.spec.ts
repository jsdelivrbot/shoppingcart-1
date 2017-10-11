import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesService } from './../messages.service';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { Logger } from 'angular2-logger/core';
import { Router } from '@angular/router';
import { ReplyComponent } from './reply.component';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Headers } from '@angular/http';

import * as msProviderClient from '@tranzform/client-msprovider/index';
import * as mdmClient from '@tranzform/client-mdm/index';
import { ReplyMessage } from './replymessage.model';


describe('ReplyComponent', () => {
  let component: ReplyComponent;
  let msgCenterApi: any;
  let modalService: any;
  let log: any;
  let translate: any;
  let messageService: any;
  let msProviderClientApi: any;
  let mdmApi: any;

  beforeEach(() => {
    msgCenterApi = jasmine.createSpyObj('msgCenterApi', 
    ['replyMessage', 'saveMessage', 'saveConversation', 'getConversationMessages', 'getTrailMessages']);
    messageService = jasmine.createSpyObj('messagesService', 
    ['setMessageDetails', 'setMessageType', 'getMessageDetails', 'getMessageType', 'setInfoMessage', 'setDraftBadge','setErrorMessage']);
    msProviderClientApi = jasmine.createSpyObj('msProviderClientApi', ['usersGet', 'providerUsersGet']);
    //modalService = jasmine.createSpyObj('router', ['navigate']);
    modalService = jasmine.createSpyObj('modalService', ['confirm']);
    log = jasmine.createSpyObj('log', ['info']);
    translate = jasmine.createSpyObj('translate', ['getText']);
    mdmApi = jasmine.createSpyObj('mdmApi', ['getCategories']);

    component = new ReplyComponent(
      mdmApi,
      msgCenterApi,
      modalService,
      translate,
      msProviderClientApi,
      log,
      messageService);
  }
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reply message', () => {
    //component.openMoreOption = ['false'];
    component.onSave = jasmine.createSpyObj('onSave', ['emit']);
    log.info.and.returnValue('');

    const model: ReplyMessage = new ReplyMessage(
      "General",
      "Ayon reply",
      "CONV1198",
      "MSG1817",
      "replied",
      "PAYER",
      "PAYER",
      "PAYER",
      "PAYER",
      "PAYER"
    )
    component.model.conversationId = 'CONV1198';
    component.model.messageId = 'MSG1817';
    component.model.message = 'replied';
    component.model.category = 'General';
    component.model.subject = 'Ayon reply';
    component.model.recipientUserType = 'PAYER';
    component.model.recipientId = 'PAYER';
    component.model.recipientName = 'PAYER';
    component.model.sendTo = 'PAYER';
    component.model.messageFor = 'PAYER';
    let params = {
      action: "send",
      messageBody: {
        "conversationCategory": "General",
        "conversationId": "CONV1198",
        "messageBody": "replied",
        "messageId": "MSG1817",
        "recipients": [{
          "recipientUserType": "",
          "recipientId": "",
          "recipientName": ""
        }],
        "subject": "Ayon reply"
      }
    }
     expect(model.sendTo).toBe(MSG_CONST.MESSAGE_FOR_PAYER);
    expect(model.recipientUserType).toBe(MSG_CONST.MESSAGE_FOR_PAYER);
    expect(model.recipientName).toBe(MSG_CONST.MESSAGE_FOR_PAYER);
    expect(model.recipientId).toBe(MSG_CONST.MESSAGE_FOR_PAYER);
    const type: String = 'send';
    const SEND_MESSAGE_SUCCESSFUL: String = 'Message sent successfully.';
    msgCenterApi.saveMessage.and.returnValue(Observable.create(observer => {
      observer.next({ status: 204 });
    }));
    translate.getText.and.returnValue(Observable.create(observer => {
      observer.next(SEND_MESSAGE_SUCCESSFUL);
    }));
    const param: any = model.transform('send');
    component.replyMessage();

    expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(param,
      { headers: new Headers(jasmine.any(Object)) });
    expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': SEND_MESSAGE_SUCCESSFUL, 'type': type });
  });

it('should display an error message while replying to message', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);

      log.info.and.returnValue('');

      //component.currentComposeMail();

      msgCenterApi.saveMessage.and.returnValue(Observable.throw('error'));

      const SEND_MESSAGE_ERROR: String = 'The system encountered an error. Please try to send it again later';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(SEND_MESSAGE_ERROR);
      }));

      const model: ReplyMessage = new ReplyMessage(
      "General",
      "Ayon reply",
      "CONV1198",
      "MSG1817",
      "replied",
      "PAYER",
      "PAYER",
      "PAYER",
      "PAYER",
      "PAYER"
    )
    component.model.conversationId = 'CONV1198';
    component.model.messageId = 'MSG1817';
    component.model.message = 'replied';
    component.model.category = 'General';
    component.model.subject = 'Ayon reply';
    component.model.recipientUserType = 'PAYER';
    component.model.recipientId = 'PAYER';
    component.model.recipientName = 'PAYER';
    component.model.sendTo = 'PAYER';
    component.model.messageFor = 'PAYER';
    let params = {
      action: "send",
      messageBody: {
        "conversationCategory": "General",
        "conversationId": "CONV1198",
        "messageBody": "replied",
        "messageId": "MSG1817",
        "recipients": [{
          "recipientUserType": "",
          "recipientId": "",
          "recipientName": ""
        }],
        "subject": "Ayon reply"
      }
    }
const param: any = model.transform('send');
    component.replyMessage();
      expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_SEND),
        { headers: new Headers(jasmine.any) });

      expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': SEND_MESSAGE_ERROR });

    });
  describe('categories list', () => {
    it('should get categories list', () => {
      //component.ngOnInit();
      mdmApi.getCategories.and.returnValue(Observable.create(observer => {
        observer.next(
          [
            {
              'category': 'userCategories',
              'data': [
                {
                  'code': 'PROVIDER',
                  'value': 'PROVIDER'
                },
                {
                  'code': 'PAYER',
                  'value': 'Benefits'
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
          ]
        );
      }));

      const categoryVal = 'userCategories';

      component.getUserCategories(categoryVal);

      expect(mdmApi.getCategories).toHaveBeenCalledWith({ category: categoryVal },
        { headers: new Headers(jasmine.any(Object)) });

      //expect(component.categories[0].data[0].code).toBe('PROVIDER');
      expect(component.categories[0]).toBeTruthy;

    });

  });


  describe('confirm dialog', () => {

    it('should open the confirm dialog', () => {


      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);

      modalService.confirm.and.returnValue(new Promise((resolve, reject) => { }));

      component.model.message = 'Hello world';

      const confirmMsg: String = 'Yes';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(confirmMsg);
      }));

      log.info.and.returnValue('');

      //component.currentComposeMail();
      component.openConfirm();

      expect(modalService.confirm).toHaveBeenCalled();

    });

  });


  describe('Save AS Draft for Reply', () => {

    it('should Save as Drafts', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);
      log.info.and.returnValue('');
      const model: ReplyMessage = new ReplyMessage(
        "General",
        "Ayon reply",
        "CONV1198",
        "MSG1817",
        "replied",
        "PAYER",
        "PAYER",
        "PAYER",
        "PAYER",
        "PAYER"
      )
      component.model.conversationId = 'CONV1198';
      component.model.messageId = 'MSG1817';
      component.model.message = 'replied';
      component.model.category = 'General';
      component.model.subject = 'Ayon reply';
      component.model.recipientUserType = 'PAYER';
      component.model.recipientId = 'PAYER';
      component.model.recipientName = 'PAYER';
      component.model.sendTo = 'PAYER';
      component.model.messageFor = 'PAYER';
      let params = {
        action: "draft",
        messageBody: {
          "conversationCategory": "General",
          "conversationId": "CONV1198",
          "messageBody": "replied",
          "messageId": "MSG1817",
          "recipients": [{
            "recipientUserType": "PAYER",
            "recipientId": "PAYER",
            "recipientName": "PAYER"
          }],
          "subject": "Ayon reply"
        }
      }

      const type: String = "draft";
      const SEND_MESSAGE_SUCCESSFUL: String = 'Message saved successfully to Drafts folder.';
      msgCenterApi.saveMessage.and.returnValue(Observable.create(observer => {
        observer.next({ status: 204 });
      }));
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(SEND_MESSAGE_SUCCESSFUL);
      }));
      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({
          "metaInfo": {
            "orderBy": "desc",
            "sortBy": "modifiedDate",
            "type": "inbox",
            "unReadCount": "1",
            "totalCount": "1"
          },
          "messages": [{

          }]
        });
      }));
      const param: any = model.transform('draft');
      component.saveToDrafts();
      const DRAFT_MESSAGE_SUCCESSFUL: String = 'Message saved successfully to Drafts folder.';
      expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform('draft'),
        { headers: new Headers(jasmine.any) });
      //expect(model.sendTo).toBe(null);
      //expect(model.recipientUserType).toBe(MSG_CONST.MESSAGE_FOR_PAYER);
      //expect(model.recipientName).toBe(MSG_CONST.MESSAGE_FOR_PAYER);
      //expect(model.recipientId).toBe(MSG_CONST.MESSAGE_FOR_PAYER);
      //expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': DRAFT_MESSAGE_SUCCESSFUL, 'type': 'draft' });

    });

    it('should give error while saving  as Drafts', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);
      log.info.and.returnValue('');
      const model: ReplyMessage = new ReplyMessage(
        "General",
        "Ayon reply",
        "CONV1198",
        "MSG1817",
        "replied",
        "PAYER",
        "PAYER",
        "PAYER",
        "PAYER",
        "PAYER"
      )
      component.model.conversationId = 'CONV1198';
      component.model.messageId = 'MSG1817';
      component.model.message = 'replied';
      component.model.category = 'General';
      component.model.subject = 'Ayon reply';
      component.model.recipientUserType = 'PAYER';
      component.model.recipientId = 'PAYER';
      component.model.recipientName = 'PAYER';
      component.model.sendTo = 'PAYER';
      component.model.messageFor = 'PAYER';
      let params = {
        action: "draft",
        messageBody: {
          "conversationCategory": "General",
          "conversationId": "CONV1198",
          "messageBody": "replied",
          "messageId": "MSG1817",
          "recipients": [{
            "recipientUserType": "PAYER",
            "recipientId": "PAYER",
            "recipientName": "PAYER"
          }],
          "subject": "Ayon reply"
        }
      }

      const type: String = "draft";
      const SEND_MESSAGE_SUCCESSFUL: String = 'Message saved successfully to Drafts folder.';
      msgCenterApi.saveMessage.and.returnValue(Observable.throw('error'));

      const SEND_MESSAGE_ERROR: String = 'The system encountered an error. Please try to send it again later';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(SEND_MESSAGE_ERROR);
      }));
    
      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({
          "metaInfo": {
            "orderBy": "desc",
            "sortBy": "modifiedDate",
            "type": "inbox",
            "unReadCount": "1",
            "totalCount": "1"
          },
          "messages": [{

          }]
        });
      }));
      const param: any = model.transform('draft');
      component.saveToDrafts();
      const DRAFT_MESSAGE_SUCCESSFUL: String = 'Message saved successfully to Drafts folder.';
      expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform('draft'),
        { headers: new Headers(jasmine.any) });
           //expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': SEND_MESSAGE_ERROR });
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
      expect(mdmApi.getCategories).toHaveBeenCalledWith({ 'category': categoryVal },
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
        ]);
      }));
      const userType = 'PROVIDER';
      component.getUserList(userType);
      expect(msProviderClientApi.providerUsersGet).toHaveBeenCalledWith({ 'usertype': userType },
        { headers: new Headers(jasmine.any(Object)) });
      expect(component.sendToList[0].value).toBe('Mark M');
    });
  });




  describe('Calling Private methods', () => {
    it('should get message Reply private methhod', () => {
      messageService.getMessageDetails.and.returnValue(
        {
          'conversationId': 'CONV418',
          'conversationCategory': 'General',
          'subject': 'General Test',
          'messageId': 'MSG673',
          'messageBody': 'We reviewed your Claim, will get back to you soon',
          'messageCategory': 'General',
          'messageStatus': ['ACTIVE'],
          'createdDate': '05/06/2017 16:48:44',
          'modifiedDate': '05/06/2017 16:48:44',
          'read': false,
          'recipients': [
            {
              'recipientUserType': 'PROVIDER',
              'recipientId': 'PR001',
              'recipientName': 'John D'
            }
          ]
        }
      );
      messageService.getMessageType.and.returnValue('inbox');
      msgCenterApi.getTrailMessages.and.returnValue(Observable.create(observer => {
        observer.next(
          [
            {
              'messageId': 'MSG673',
              'messageBody': 'Hello World',
              'messageCategory': 'INBOUND',
              'messageStatus': ['ACTIVE'],
              'createdDate': '03/02/2017 01:09:20',
              'modifiedDate': '03/27/2017 18:37:10',
              'read': false,
              'recipients': [
                {
                  'recipientUserType': 'user Type',
                  'recipientId': 'user type',
                  'recipientName': 'Name'
                }
              ]
            }, {
              'messageId': 'MSG673',
              'messageBody': 'Java World',
              'messageCategory': 'INBOUND',
              'messageStatus': ['ACTIVE'],
              'createdDate': '02/02/2017 01:09:20',
              'modifiedDate': '02/26/2017 18:37:10',
              'read': true,
              'recipients': [
                {
                  'recipientUserType': 'user Type',
                  'recipientId': 'user type',
                  'recipientName': 'Name'
                }
              ]
            }]
        );
      })
      );
      component['getMessageReply']();
      expect(messageService.getMessageDetails).toHaveBeenCalled();
      expect(messageService.getMessageType).toHaveBeenCalled();
       const paramHis: any = {
        'messageid': component['messageDetails'].messageId,
        'type': component['type']
      };
      expect(msgCenterApi.getTrailMessages).toHaveBeenCalledWith(paramHis, {
        headers: new Headers(jasmine.any(Object))
      }
      );
      expect(component['messageDetails'].messageId).toBe('MSG673');
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

    it('should body is valid', () => {

      component.validateMsgText('hello', false);

      expect(component.msgSubjectInvalid).toBeFalsy();
    });

    it('should message body is inValid', () => {

      component.validateMsgText('<hello>', false);

      expect(component.msgSubjectInvalid).toBeFalsy();
    });

    it('should body is inValid by using asterisk', () => {

      component.validateMsgText('<hello*', false);

      expect(component.msgSubjectInvalid).toBeFalsy();
    });

  });

  describe('validateMessageBody', () => {

    it('should message body is inValid', () => {

      const model: ReplyMessage = new ReplyMessage(
        'General',
        '123',
        'CON123',
        'MSG123',
        'MEssage Body',
        'Provider',
        'Ayon'
      )
      component.model.conversationId = 'CON123';
      component.model.messageId = 'MSG123';
      component.model.message = 'MEssage Body*';
      component.validateMsgBody();
      expect(component.validateMsgBody).toBeTruthy();
    });

  });

  describe('getRecipient', () => {

    it('should get Recipient', () => {

      component.getRecipient();
    });

    it('should message body is inValid', () => {

      const model: ReplyMessage = new ReplyMessage(
        'General',
        '123',
        'CON123',
        'MSG123',
        'MEssage Body',
        'Provider',
        'Ayon'
      )
      component.model.conversationId = 'CON123';
      component.model.messageId = 'MSG123';
      component.model.message = 'MEssage Body*';

      component.getRecipient();
      expect(component.sendToList).toBeTruthy();
    });

  });

  describe('openSaveDraftConfirm', () => {
    it('should open save to drafts confirm dialog', () => {
      modalService.confirm.and.returnValue(new Promise((resolve, reject) => { }));
      const confirmMsg: String = 'Yes';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(confirmMsg);
      }));
      component.openSaveDraftConfirm();
      expect(modalService.confirm).toHaveBeenCalled();
      spyOn(window, 'confirm').and.returnValue(true);
      const model: ReplyMessage = new ReplyMessage(
        'General',
        'Test Subject',
        'CONV1',
        'MSG3',
        'Test Forward Draft',
        'PROVIDER',
        'P001',
        'Mark M'
      );
      component.model = model;
      const actionParam = 'draft';
      msgCenterApi.saveMessage.and.returnValue(Observable.create(observer => {
        observer.next({ status: 204 });
      }));
      const DRAFT_MESSAGE_SUCCESSFUL: String = 'Message saved successfully to Drafts folder.';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(DRAFT_MESSAGE_SUCCESSFUL);
      }));
      /* expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_DRAFT),
        { headers: new Headers(jasmine.any) }
      ); */
     // expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': DRAFT_MESSAGE_SUCCESSFUL, 'type': MSG_CONST.TYPE_DRAFT });
    });
  });

});
