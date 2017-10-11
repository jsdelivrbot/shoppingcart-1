

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesService } from './../messages.service';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { Logger } from 'angular2-logger/core';
import { Router } from '@angular/router';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { MessageListComponent } from './message-list.component';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { ShellService } from '@tranzform/common/shell/shell.service';
import { AuthService } from './../../shared/authenticate/auth.service';
/*
describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let router: any = null;
  let msgCenterApi: any;
  let messagesService: any;
  let log: any;
  let shellService: any;
  let authService: any;
  beforeEach(() => {
    msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['updateReadIndicator', 'deleteMessage','getConversationMessages']);
    messagesService = jasmine.createSpyObj('messagesService', ['setMessageDetails', 'setMessageType','getFilterOptions']);
    router = jasmine.createSpyObj('router', ['navigate']);
    log = jasmine.createSpyObj('log', ['info']);
    shellService = jasmine.createSpyObj('shellService', ['messageCount']);
    authService = jasmine.createSpyObj('authService', []);
    component = new MessageListComponent(
      messagesService,
      msgCenterApi,
      log,
      shellService,
      router,
      authService);
  }
  );


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should delete the message in inbox folder', () => {

    component.onDelete = jasmine.createSpyObj('onDelete', ['emit']);

    spyOn(component, 'moreOption');

    log.info.and.returnValue('');

    const msgId = 'MSG123';
    const type = 'inbox';
    const params: any = {
      messageid: msgId,
      type: type
    };

    const messageDetails: any = {

        'messageId': msgId,
      'type': type

    }

    msgCenterApi.deleteMessage.and.returnValue(Observable.create(observer => {
      observer.next({ 'status': 200 });
    }
    ));
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
    component.deleteMsg(messageDetails, type, 0);

    expect(msgCenterApi.deleteMessage).toHaveBeenCalledWith(params,
      { headers: new Headers(jasmine.any(Object)) });

    expect(component.onDelete.emit).toHaveBeenCalledWith({ 'type': type });

  });

  it('should open more options in inbox folder', () => {
    component.openMoreOption = ['true'];
    log.info.and.returnValue('');
    component.moreOption(0, 0)
    expect(component).toBeTruthy();
  });

  it('should not open more options in inbox folder', () => {
    component.openMoreOption = ['false'];
    log.info.and.returnValue('');
    component.moreOption(0, 10)
    expect(component).toBeTruthy();
  });

  it('should handle msg details on click in inbox', () => {
    //component.openMoreOption = ['false'];
    component.onDelete = jasmine.createSpyObj('onDelete', ['emit']);
    const msgDetails: any = {
      "conversationId": "CONV601",
      "tenantEnrollmentId": "M1001",
      "tenantId": "HZ0001",
      "conversationCategory": "General",
      "subject": "Sub Chrome",
      "conversationStatus": "ACTIVE",
      "messages": {
        "messageId": "MSG1235",
        "messageBody": "testing",
        "messageCategory": "INBOUND",
        "read": false
      }
    }
    log.info.and.returnValue('');
    component.handleMessageDetailsClick(msgDetails, 'inbox')
    expect(component).toBeTruthy();
  });

  it('should handle msg details on click in draft', () => {
    //component.openMoreOption = ['false'];
    component.onDelete = jasmine.createSpyObj('onDraftMsgClick', ['emit']);
    const msgDetails: any = {
      "conversationId": "CONV601",
      "tenantEnrollmentId": "M1001",
      "tenantId": "HZ0001",
      "conversationCategory": "General",
      "subject": "Sub Chrome",
      "conversationStatus": "ACTIVE",
      "messages": {
        "messageId": "MSG1235",
        "messageBody": "testing",
        "messageCategory": "INBOUND",
        "read": false
      }
    }
    log.info.and.returnValue('');
    component.handleMessageDetailsClick(msgDetails, 'drafts')
    expect(component).toBeTruthy();
  });

  it('should mark as read in inbox folder', () => {

    component.onApplyFilter = jasmine.createSpyObj('onApplyFilter', ['emit']);
    spyOn(component, 'moreOption');
    log.info.and.returnValue('');

    const msgId = 'MSG1814';
    const val = 'markunread';
    const userid2 = 'M1001@tranzform.com';
    component.openMoreOption = ['true'];

const data : any = {
  "metaInfo": {
		"orderBy": "desc",
		"sortBy": "modifiedDate",
		"type": "inbox",
		"unReadCount": "1",
		"totalCount": "1"
  }
}
const filterOpts : any = {
  "messageStatus":"ok"
}

    const params: any = {
      messageid: msgId,
      readtype: val,
      userid:userid2
    };
    msgCenterApi.updateReadIndicator.and.returnValue(Observable.create(observer => {
      observer.next({ "httpStatus": "OK", "messageId": "MSGCEN0013", "message":
      "Conversation marked as read successfully." });
    }));
    const msgDetails: any = {
	"conversationId": "CONV1195",
	"conversationCategory": "General",
	"subject": "inbox 4",
	"messageId": "MSG1814",
	"messageBody": "",
	"messageStatus": "ACTIVE",
	"createdDate": "07/14/2017 06:19:51",
	"modifiedDate": "07/14/2017 06:19:51",
	"readIndicator": true,
	"isFwd": false,
	"recipients": [{
		"recipientId": "M1001@tranzform.com",
		"recipientName": "PAYER",
		"recipientUserType": "PROVIDER"
	}]
}
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
    messagesService.getFilterOptions.and.returnValue(filterOpts);

    component.msgReadStatus(msgDetails, "inbox", 0);
    //params.readtype="markread";
    expect(msgCenterApi.updateReadIndicator).toHaveBeenCalledWith(params,
      { headers: new Headers(jasmine.any(Object)) });
       expect(component.onApplyFilter.emit).toHaveBeenCalledWith({'data': data, 'messageStatus': filterOpts.messageStatus });
  });





  it('should mark as unread in inbox folder', () => {

    component.onApplyFilter = jasmine.createSpyObj('onApplyFilter', ['emit']);
    spyOn(component, 'moreOption');
    log.info.and.returnValue('');

    const msgId = 'MSG1814';
    const val = 'markread';
    const userid2 = 'M1001@tranzform.com';
    component.openMoreOption = ['true'];

const data : any = {
  "metaInfo": {
		"orderBy": "desc",
		"sortBy": "modifiedDate",
		"type": "inbox",
		"unReadCount": "1",
		"totalCount": "1"
  }
}
const filterOpts : any = {
  "messageStatus":"ok"
}

    const params: any = {
      messageid: msgId,
      readtype: val,
      userid:userid2
    };
    msgCenterApi.updateReadIndicator.and.returnValue(Observable.create(observer => {
      observer.next({ "httpStatus": "OK", "messageId": "MSGCEN0013", "message":
      "Conversation marked as read successfully." });
    }));
    const msgDetails: any = {
	"conversationId": "CONV1195",
	"conversationCategory": "General",
	"subject": "inbox 4",
	"messageId": "MSG1814",
	"messageBody": "",
	"messageStatus": "ACTIVE",
	"createdDate": "07/14/2017 06:19:51",
	"modifiedDate": "07/14/2017 06:19:51",
	"readIndicator": false,
	"isFwd": false,
	"recipients": [{
		"recipientId": "M1001@tranzform.com",
		"recipientName": "PAYER",
		"recipientUserType": "PROVIDER"
	}]
}
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
    messagesService.getFilterOptions.and.returnValue(filterOpts);

    component.msgReadStatus(msgDetails, "inbox", 0);
    //params.readtype="markread";
    expect(msgCenterApi.updateReadIndicator).toHaveBeenCalledWith(params,
      { headers: new Headers(jasmine.any(Object)) });
       expect(component.onApplyFilter.emit).toHaveBeenCalledWith({'data': data, 'messageStatus': filterOpts.messageStatus });
  });

});
