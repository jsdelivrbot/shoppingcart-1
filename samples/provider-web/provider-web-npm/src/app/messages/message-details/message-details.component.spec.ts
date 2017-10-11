import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailsComponent } from './message-details.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Headers } from '@angular/http';
import { ShellService } from '@tranzform/common/shell/shell.service';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { AuthService } from './../../shared/authenticate/auth.service';
describe('MessageDetailsComponent', () => {
  let component: MessageDetailsComponent;
  let router: any = null;
  let msgCenterApi: any;
  let messagesService: any;
  let modalService: any;
  let log: any;
  let shellService: any;
  let translate: any;
  let authService: any;
  describe('MessageDetailsComponent', () => {

    beforeEach(() => {
      msgCenterApi = jasmine.createSpyObj('msgCenterApi',
        ['getTrailMessages', 'deleteMessage', 'updateReadIndicator', 'getConversationMessages']);
      messagesService = jasmine.createSpyObj(
        'messagesService',
        ['getMessageDetails', 'getMessageType', 'getInfoMessage', 'clearInfoMessage', 'getErrorMessage', 'clearErrorMessage']);
      router = jasmine.createSpyObj('router', ['navigate']);
      log = jasmine.createSpyObj('log', ['info']);
      modalService = jasmine.createSpyObj('modalService', ['open']);
      shellService = jasmine.createSpyObj('shellService', ['messageCount']);
      translate = jasmine.createSpyObj('translate', ['getText']);
      authService = jasmine.createSpyObj('authService', []);
      messagesService.getInfoMessage.and.returnValue(Observable.of('subscribe'));
      messagesService.clearInfoMessage.and.returnValue('');
      messagesService.getErrorMessage.and.returnValue(Observable.of('subscribe'));
      messagesService.clearErrorMessage.and.returnValue('');
      authService = jasmine.createSpyObj('authService', ['getText']);

      log.info.and.returnValue('');
      component = new MessageDetailsComponent(
        messagesService,
        msgCenterApi,
        log, router,
        modalService,
        shellService,
        translate,
        authService
      );
    }
    );

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should should save message reply', () => {
      spyOn(component, 'replyMessageSave');
      log.info.and.returnValue('');
      const msgVal = 'MSG123 is message';
      const event: any = {
        msg: msgVal
      };
      component.replyMessageSave(event);
      expect(component).toBeTruthy();
    });
    it('should set message details and message history', () => {
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
      messagesService.getMessageType.and.returnValue('inbox');
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
      msgCenterApi.updateReadIndicator.and.returnValue(Observable.of('updateReadIndicator'));
      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ metaInfo: { unReadCount: 10 } });
      }));
      component.ngOnInit();
      expect(messagesService.getMessageDetails).toHaveBeenCalled();
      expect(messagesService.getMessageType).toHaveBeenCalled();
      const param: any = {
        'messageid': component['messageDetails'].messageId,
        'readtype': 'markread',
        'userid': 'M1001@tranzform.com'
      };
      expect(msgCenterApi.updateReadIndicator).toHaveBeenCalledWith(param, {
        headers: new Headers(jasmine.any(Object))
      }
      );
      const paramHis: any = {
        'messageid': component['messageDetails'].messageId,
        'type': component['type']
      };
      expect(msgCenterApi.getTrailMessages).toHaveBeenCalledWith(paramHis, {
        headers: new Headers(jasmine.any(Object))
      }
      );
      const paramConversiosation: any = {
        'type': 'inbox',
        'sortby': 'modifiedDate',
        'orderby': 'desc',
        'readindicator': 'UNREAD'
      };
      expect(msgCenterApi.getConversationMessages).toHaveBeenCalledWith(paramConversiosation, {
        headers: new Headers(jasmine.any(Object))
      }
      );
      expect(component['messageDetails'].conversationId).toBe('CONV418');
      expect(component['type']).toBe('inbox');
      expect(component['messageDetails'].read).toBeTruthy();
      expect(component['trailingMessages'][0].messageId).toBe("MSG673");
    });
    it('should get Date object', () => {
      const dateStr = '29/06/2017';
      let dateObj = component.createDate(dateStr);
      expect(dateObj instanceof Date).toBeTruthy();
    });
    it('should close popup', () => {
      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);
      component.handleBackButtonClicked();
    });
    it('should open Reply Modal', () => {
      let result = jasmine.createSpyObj('result', ['catch']);
      modalService.open.and.returnValue({ 'result': result });
      component.openReplyModal('');
    });
    it('should save message', () => {
      let event = { 'msg': 'message saved successfully' };
      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next('message saved successfully');
      }));
      component.replyMessageSave(event);
    });
  });

  it('should delete the message in message detail folder', () => {
    const msgId = 'MSG123';
    const type = 'inbox';

    messagesService.getMessageDetails.and.returnValue(
      {
        'messageId': 'MSG123',
        'messageBody': 'Hello World',
        'messageCategory': 'INBOUND',
        'messageStatus': [
          'ACTIVE'
        ],
        'createdDate': '03/02/2017 01:09:20',
        'modifiedDate': '03/27/2017 18:37:10',
        'read': true
      },
    );
    messagesService.getMessageType.and.returnValue('inbox');
    msgCenterApi.updateReadIndicator.and.returnValue(Observable.create(observer => {
      observer.next(jasmine.any(Object));
    }));
    msgCenterApi.getTrailMessages.and.returnValue(Observable.create(observer => {
      observer.next([
        {
          'messageId': 'MSG673',
          'messageBody': 'Subject Ayon',
          'messageCategory': 'INBOUND',
          'messageStatus': [
            'ACTIVE'
          ],
          'createdDate': '06/28/2017 00:01:23',
          'modifiedDate': '06/28/2017 00:01:23',
          'read': true
        }
      ]);
    }));
    component.ngOnInit();
    expect(messagesService.getMessageDetails).toHaveBeenCalled();
    expect(messagesService.getMessageType).toHaveBeenCalled();
    const messageDetails: any = {
      'messageId': "MSG123"
    };
    const params: any = {
      messageid: "MSG123",
      type: type
    };
    msgCenterApi.deleteMessage.and.returnValue(Observable.create(observer => {
      observer.next({ 'status': 200 });
    }
    ));
    component.deleteMsg(messageDetails);

    expect(msgCenterApi.deleteMessage).toHaveBeenCalledWith(params,
      { headers: new Headers(jasmine.any(Object)) }
    );
    component.ngOnDestroy();
  });
});
