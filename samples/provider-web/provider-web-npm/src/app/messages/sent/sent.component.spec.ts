import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentComponent } from './sent.component';

import { Observable } from 'rxjs/Observable';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { Headers } from '@angular/http';

/* describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); */

describe('SentComponent', () => {
  let component: SentComponent;
  let msgCenterApi: any;
  let log: any;


  beforeEach(() => {
    msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['getSentItems', 'getConversationMessages', 'loadSentItems', 'loadSentwithFilter']);
    log = jasmine.createSpyObj('log', ['info']);

    component = new SentComponent(
      msgCenterApi,
      log);

  });

  it('should create', () => {
    expect(component).toBeTruthy(true);
  });
  const sentDetails = [
    {
      'metaInfo': {
        'orderBy': 'desc',
        'sortBy': 'modifiedDate',
        'type': 'sent',
        'unReadCount': '0',
        'totalCount': '2'
      },
      'messages': [
        {
          'conversationId': 'CONV418',
          'conversationCategory': 'General',
          'subject': 'Cannot provider  details',
          'messages': {
            'messageId': 'MSG673',
            'messageBody': 'We reviewed your Claim, will get back to you soon',
            'messageCategory': 'General',
            'messageStatus': [
              'ACTIVE'
            ],
            'createdDate': '05/06/2017 16:48:44',
            'modifiedDate': '05/06/2017 16:48:44',
            'read': false
          }
        }
      ],
      'statusInfo': null
    }
  ]
  describe('sent list', () => {
    it('should get sent list', () => {

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next(
          sentDetails
        );
      }));

      component.getSentItems(MSG_CONST.TYPE_SENT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
      expect(msgCenterApi.getConversationMessages).toHaveBeenCalledWith({
        'type': MSG_CONST.TYPE_SENT,
        'sortby': MSG_CONST.MODIFIED_DATE, 'orderby': MSG_CONST.MSG_ORDER_DESC
      },
        { headers: new Headers(jasmine.any(Object)) });

      expect(component.sentMessages[0].messages[0].conversationCategory).toBe('General');

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ 'status': 200 });
      }));


      const event: any = {
        'data': sentDetails
      }

      component.loadSentItems(event);
      console.log(event.data[0].messages[0].conversationCategory)
      expect(event.data[0].messages[0].conversationCategory).toBe('General');

      component.loadSentwithFilter(event);
      expect(component).toBeTruthy();
      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ 'status': 200 });
      }));

    });

  });
});
