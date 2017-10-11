import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponent } from './delete.component';

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

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let msgCenterApi: any;

  let log: any;


  beforeEach(() => {
    msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['getDeleteItems', 'getConversationMessages', 'loadDeletewithFilter']);
    log = jasmine.createSpyObj('log', ['info']);

    component = new DeleteComponent(
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
        'type': 'trash',
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
  describe('delete list', () => {
    it('should get delete list', () => {

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next(
          sentDetails
        );
      }));

      component.getDeleteItems(MSG_CONST.TYPE_DELETE, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
      expect(msgCenterApi.getConversationMessages).toHaveBeenCalledWith({
        'type': MSG_CONST.TYPE_DELETE,
        'sortby': MSG_CONST.MODIFIED_DATE, 'orderby': MSG_CONST.MSG_ORDER_DESC
      },
        { headers: new Headers(jasmine.any(Object)) });

      expect(component.deletedMessages[0].messages[0].conversationCategory).toBe('General');

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ 'status': 200 });
      }));


      const event: any = {
        'data': sentDetails
      }

      component.loadDeletewithFilter(event);
      expect(component).toBeTruthy();
      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ 'status': 200 });
      }));

    });

  });
});
