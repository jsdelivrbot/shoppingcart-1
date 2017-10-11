import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxComponent } from './inbox.component';

import { Observable } from 'rxjs/Observable';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { Headers } from '@angular/http';

describe('InboxComponent', () => {
  let component: InboxComponent;
  let msgCenterApi: any;
  let translate: any = null;
  let log: any;


  beforeEach(() => {
    msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['getInboxDetails', 'getConversationMessages']);
    translate = jasmine.createSpyObj('translate', ['getText']);
    log = jasmine.createSpyObj('log', ['info']);

    component = new InboxComponent(
      msgCenterApi,
      translate,
      log);

  });

  it('should create', () => {
    expect(component).toBeTruthy(true);
  });
  const inboxDetails = [
    {
      'metaInfo': {
        'orderBy': 'desc',
        'sortBy': 'modifiedDate',
        'type': 'inbox',
        'unReadCount': '0',
        'totalCount': '1'
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
          'readIndicator': true,
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
  ]
  describe('inbox list', () => {
    it('should get inbox list', () => {

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next(
          inboxDetails
        );
      }));

      component.getInboxDetails(MSG_CONST.TYPE_INBOX, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
      expect(msgCenterApi.getConversationMessages).toHaveBeenCalledWith({
        'type': MSG_CONST.TYPE_INBOX,
        'sortby': MSG_CONST.MODIFIED_DATE, 'orderby': MSG_CONST.MSG_ORDER_DESC
      },
        { headers: new Headers(jasmine.any(Object)) });

      expect(component.inboxMessages[0].messages[0].conversationCategory).toBe('General');

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ 'status': 200 });
      }));


      const event: any = {
        'data': inboxDetails
      }

      component.loadInbox(event);
      console.log(event.data[0].messages[0].conversationCategory)
      expect(event.data[0].messages[0].conversationCategory).toBe('General');

      component.loadInboxwithFilter(event);
      expect(component).toBeTruthy();

    });

  });
});
