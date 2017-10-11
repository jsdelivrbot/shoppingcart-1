import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForwardComponent } from './forward.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { Http, Headers } from '@angular/http';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { MessageHistoryComponent} from '../message-history/message-history.component';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import * as mdmClient from '@tranzform/client-mdm/index';
import * as msProviderClient from '@tranzform/client-msprovider/index';
import {Observable} from 'rxjs/Observable';
import { Logger } from 'angular2-logger/core';
import { MessageConfigModule as MSG_CONST } from '../message-constant';
import { MessagesService } from '../messages.service';
import { ForwardMessage } from './forwardmessage.model';
import { ModalService } from '@tranzform/common/modal';
describe('ForwardComponent', () => {
  let component: ForwardComponent;
  let translate: any;
  let mdmApi: any;
  let msgCenterApi: any;
  let msProviderClientApi: any;
  let log: any;
  let messagesService: any;
  let modalService: any;
  
  beforeEach(() => {
  translate = jasmine.createSpyObj('translationService', ['getInstantText', 'getText']);
  mdmApi = jasmine.createSpyObj('mdmApi', ['getCategories']);
  msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['getTrailMessages', 'saveMessage', 'getConversationMessages']);
  msProviderClientApi = jasmine.createSpyObj('msProviderClientApi', ['usersGet','providerUsersGet']);
  log = jasmine.createSpyObj('log', ['info', 'debug', 'warn']);
  messagesService = jasmine.createSpyObj('messagesService', ['getMessageDetails', 'getMessageType', 'setDraftBadge', 'setInfoMessage','setErrorMessage']);
  modalService = jasmine.createSpyObj('modalService', ['close', 'confirm']);
  component = new ForwardComponent(mdmApi, msgCenterApi, translate, msProviderClientApi, log, messagesService, modalService);
  });
  it('should create component and get message details', () => {
    expect(component).toBeDefined();
  });
  it('should get forward message details (user category list, get user list and trailing messages)', () => {
    mdmApi.getCategories.and.returnValue(Observable.create(observer => {
      observer.next(
          [
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
          ]
        );
      })
    );
    messagesService.getMessageDetails.and.returnValue(
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
          'read': true,
          'recipients': [
            {
              'recipientUserType': 'PROVIDER',
              'recipientId': 'PR001',
              'recipientName': 'John D'
            }
          ]
        
      }
    );
    msProviderClientApi.providerUsersGet.and.returnValue(Observable.create(observer => {
      observer.next(
        [{
          'tenantId': 'tenant1',
          'userId': 'PR002',
          'userFirstName': 'Mark',
          'userMiddleName': 'N',
          'userLastName': 'M',
          'userType': 'PROVIDER',
          'mappingId': '99887767'
        }, {
          'tenantId': 'tenant1',
          'userId': 'PR001',
          'userFirstName': 'Robert',
          'userMiddleName': 'N',
          'userLastName': 'Smith',
          'userType': 'PROVIDER',
          'mappingId': '99887766'
        }]
      );
    })
    );
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
            'read': true,
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
          }, {
            'messageId': 'MSG673',
            'messageBody': 'Angular World',
            'messageCategory': 'INBOUND',
            'messageStatus': ['ACTIVE'],
            'createdDate': '02/01/2017 01:09:20',
            'modifiedDate': '02/25/2017 18:37:10',
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
    msProviderClientApi.providerUsersGet.and.returnValue(Observable.create(observer => {
      observer.next(
        [{
          'tenantId': 'tenant1',
          'userId': 'PR002',
          'userFirstName': 'Mark',
          'userMiddleName': 'N',
          'userLastName': 'M',
          'userType': 'PROVIDER',
          'mappingId': '99887767'
        }, {
          'tenantId': 'tenant1',
          'userId': 'PR001',
          'userFirstName': 'Robert',
          'userMiddleName': 'N',
          'userLastName': 'Smith',
          'userType': 'PROVIDER',
          'mappingId': '99887766'
        }]
      );
    })
    );
    messagesService.getMessageType.and.returnValue('inbox');
    component.ngOnInit();
    const param = {'category' : MSG_CONST.MESSAGE_USER_CATEGORY};
    expect(mdmApi.getCategories).toHaveBeenCalledWith(param,
      {headers: new Headers(jasmine.any(Object))}
    );
    expect(msProviderClientApi.providerUsersGet).toHaveBeenCalledWith(
      {'usertype': 'PROVIDER'},
      { headers: new Headers(jasmine.any(Object))}
    );
    const msgHisparam: any = {
      'messageid': 'MSG673',
      'type': 'inbox'
    };
    expect(msgCenterApi.getTrailMessages).toHaveBeenCalledWith(msgHisparam,
      {headers: new Headers(jasmine.any(Object))}
    );
    expect(msProviderClientApi.providerUsersGet).toHaveBeenCalledWith(
      {'usertype': 'PROVIDER'},
      { headers: new Headers(jasmine.any(Object))}
    );
    expect(component.sendToList[0].value).toBe("Mark N M");
    expect(component.messageForList[0].data[0].value).toBe('Payer');
    expect(component.sendToList[0].value).toBe("Mark N M");
    expect(component['type']).toBe('inbox');
    expect(component['trailingMessages'][0].messageId).toBe("MSG673");
  });




  it('should get category list', () => {
    mdmApi.getCategories.and.returnValue(Observable.create(observer => {
      observer.next(
        [{
          'category': 'conversationCategories',
          'data': [
            {
              'code': 'BENEFITS',
              'value': 'Benefits'
            }, {
              'code': 'BILLING',
              'value': 'Billing'
            }, {
              'code': 'CLAIMS',
              'value': 'Claims'
            }, {
              'code': 'ENROLLMENT',
              'value': 'Enrollment'
            }, {
              'code': 'General',
              'value': 'General'
            }, {
              'code': 'PROVIDER_DIRECTORY',
              'value': 'Provider Directory'
            }, {
              'code': 'TECHNICAL_SUPPORT',
              'value': 'Technical Support'
            }
          ],
          'createdBy': 'Admin',
          'createdDate': '11/23/2016',
          'modifiedDate': '11/23/2016',
          'active': true
        }]
      );
    })
    );
    component['getCategories'](MSG_CONST.MESSAGE_CATEGORY_TYPE);
    const param = {'category' : MSG_CONST.MESSAGE_CATEGORY_TYPE};
    expect(mdmApi.getCategories).toHaveBeenCalledWith(param,
      {headers: new Headers(jasmine.any(Object))}
    );
    expect(component.categories[0].data[0].value).toBe("Benefits");
  });
  it('should open the confirm dialog', () => {
      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);
      modalService.confirm.and.returnValue(new Promise((resolve, reject) => { }));
      component.model.message = 'Hello world';
      const confirmMsg: String = 'Yes';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(confirmMsg);
      }));
      log.info.and.returnValue('');
      component.openCancelConfirm();
      expect(modalService.confirm).toHaveBeenCalled();
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
    it('should message body is valid', () => {
      component.validateMsgBody();
      expect(component.msgBodyInvalid).toBeFalsy();
    });

    it('should message body is inValid', () => {

      const model: ForwardMessage = new ForwardMessage(
        'General',
        '123',
        'CON123',
        'MSG123',
        'MEssage Body',
        'Provider',
        'Ayon'
      );
      component.model.conversationId = 'CON123';
      component.model.messageId = 'MSG123';
      component.model.message = 'MEssage Body*';
      component.validateMsgBody();
      expect(component.msgBodyInvalid).toBeTruthy();
    });
  });

  it('should open save to drafts confirm dialog', () => {
    modalService.confirm.and.returnValue(new Promise((resolve, reject) => { }));
    const confirmMsg: String = 'Yes';
    translate.getText.and.returnValue(Observable.create(observer => {
      observer.next(confirmMsg);
    }));
    component.openSaveDraftConfirm();
    expect(modalService.confirm).toHaveBeenCalled();
    spyOn(window, 'confirm').and.returnValue(true);
    const model: ForwardMessage = new ForwardMessage(
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
    /*expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_DRAFT),
       { headers: new Headers(jasmine.any) }
    );*/
    //expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': DRAFT_MESSAGE_SUCCESSFUL, 'type': MSG_CONST.TYPE_DRAFT});
  });


  it('should open forwardMessage', () => {
   
   component.onSave = jasmine.createSpyObj('onSave', ['emit']);
    log.info.and.returnValue('');

    const model: ForwardMessage = new ForwardMessage(
      "General",
      "Ayon reply",
      "CONV1198",
      "MSG1817",
    "replied",
    "PAYER",
    "PAYER",
    "PAYER" ,
     "PAYER" ,
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
      component.model.sendTo= 'PAYER';
    component.model.messageFor= 'PAYER';
      let params = {
        action: "send",
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
component.model = model;
    const type: String = "send";
    const SEND_MESSAGE_SUCCESSFUL: String = 'Message sent successfully.';
    msgCenterApi.saveMessage.and.returnValue(Observable.create(observer => {
      observer.next({ status: 204 });
    }));
    translate.getText.and.returnValue(Observable.create(observer => {
      observer.next(SEND_MESSAGE_SUCCESSFUL);
    }));
    const param: any = model.transform('send');
    component.forwardMessage();
 
    
    
    msgCenterApi.saveMessage.and.returnValue(Observable.create(observer => {
       observer.next({ status: 204 });
    }));
    const FORWARD_SEND_MESSAGE_SUCCESSFUL: String = 'Message Sent Successfully';
    translate.getText.and.returnValue(Observable.create(observer => {
      observer.next(FORWARD_SEND_MESSAGE_SUCCESSFUL);
    }));
    expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_SEND),
       { headers: new Headers(jasmine.any) }
    );
    //expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': DRAFT_MESSAGE_SUCCESSFUL, 'type': MSG_CONST.TYPE_DRAFT});
  });

  it('should display an error message while forwarding message', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);

      log.info.and.returnValue('');

      //component.forwardMessage();

      msgCenterApi.saveMessage.and.returnValue(Observable.throw('error'));

      const SEND_MESSAGE_ERROR: String = 'The system encountered an error. Please try to send it again later';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(SEND_MESSAGE_ERROR);
      }));

       const model: ForwardMessage = new ForwardMessage(
      "General",
      "Ayon reply",
      "CONV1198",
      "MSG1817",
    "replied",
    "PAYER",
    "PAYER",
    "PAYER" ,
     "PAYER" ,
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
      component.model.sendTo= 'PAYER';
    component.model.messageFor= 'PAYER';
      let params = {
        action: "send",
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
component.model = model;
      component.forwardMessage();

      expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform(MSG_CONST.TYPE_SEND),
        { headers: new Headers(jasmine.any) });

      expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': SEND_MESSAGE_ERROR });

    });


  it('should open save to drafts confirm dialog then give error while saving draft', () => {
    modalService.confirm.and.returnValue(new Promise((resolve, reject) => { }));
    const confirmMsg: String = 'Yes';
    translate.getText.and.returnValue(Observable.create(observer => {
      observer.next(confirmMsg);
    }));
    component.openSaveDraftConfirm();
    expect(modalService.confirm).toHaveBeenCalled();
    spyOn(window, 'confirm').and.returnValue(true);
    const model: ForwardMessage = new ForwardMessage(
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
    msgCenterApi.saveMessage.and.returnValue(Observable.throw('error'));
    const SEND_MESSAGE_ERROR: String = 'The system encountered an error.';
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next(SEND_MESSAGE_ERROR);
      }));
      expect(component.onSave.emit).toHaveBeenCalledWith({ 'msg': SEND_MESSAGE_ERROR });
  });
    it('should Save as Drafts', () => {

      component.onSave = jasmine.createSpyObj('onSave', ['emit']);
      log.info.and.returnValue('');
      const model: ForwardMessage = new ForwardMessage(
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
      component['saveToDrafts']();
      const DRAFT_MESSAGE_SUCCESSFUL: String = 'Message saved successfully to Drafts folder.';
      expect(msgCenterApi.saveMessage).toHaveBeenCalledWith(component.model.transform('draft'),
        { headers: new Headers(jasmine.any) });
    });
});
