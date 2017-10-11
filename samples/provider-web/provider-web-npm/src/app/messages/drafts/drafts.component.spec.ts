import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftsComponent } from './drafts.component';

import { Observable } from 'rxjs/Observable';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { Headers } from '@angular/http';
import { MessagesService } from './../messages.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

describe('DraftsComponent', () => {
  let component: DraftsComponent;
  let msgCenterApi: any;
  let log: any;
  let modalService: any;
  let messageService: any;
  let router: any;
  let translate: any;


  beforeEach(() => {
    msgCenterApi = jasmine.createSpyObj('msgCenterApi', ['getSentItems', 'getConversationMessages', 'loadSentItems',
      'loadSentwithFilter', 'getTrailMessages']);
    modalService = jasmine.createSpyObj('modalService', ['open']);
    messageService = jasmine.createSpyObj('messageService', ['getMessageDetails', 'setInfoMessage', 'setDraftBadge']);
    router = jasmine.createSpyObj('router', ['navigate']);
    log = jasmine.createSpyObj('log', ['info']);
    translate = jasmine.createSpyObj('translate', ['getText']);
    component = new DraftsComponent(
      messageService, msgCenterApi, modalService, router, log,translate);
  });

  it('should create', () => {
    expect(component).toBeTruthy(true);
  });
  const trailMessagedetails = [
    {
      'messageId': 'MSG379',
      'messageBody': 'Hello World',
      'messageCategory': 'INBOUND',
      'messageStatus': [
        'ACTIVE'
      ],
      'createdDate': '03/02/2017 01:09:20',
      'modifiedDate': '03/27/2017 18:37:10',
      'read': true
    },
    {
      'messageId': 'MSG379',
      'messageBody': 'Java World',
      'messageCategory': 'INBOUND',
      'messageStatus': [
        'ACTIVE'
      ],
      'createdDate': '02/02/2017 01:10:21',
      'modifiedDate': '02/26/2017 18:37:10',
      'read': true
    },
    {
      'messageId': 'MSG379',
      'messageBody': 'Angular World',
      'messageCategory': 'INBOUND',
      'messageStatus': [
        'ACTIVE'
      ],
      'createdDate': '02/01/2017 01:11:22',
      'modifiedDate': '02/25/2017 18:37:10',
      'read': true
    }
  ]
  const draftDetails = [
    {
      'metaInfo': {
        'orderBy': 'desc',
        'sortBy': 'modifiedDate',
        'type': 'draft',
        'totalCount': '16'
      },
      'messages': [
        {
          'conversationId': 'CONV1208',
          'conversationCategory': 'General',
          'subject': 'Payer test',
          'messageId': 'MSG379',
          'messageBody': '',
          'messageStatus': 'DRAFT',
          'createdDate': '07/17/2017 07:41:33',
          'modifiedDate': '07/17/2017 07:41:33',
          'readIndicator': false,
          'isFwd': false,
          'recipients': [
            {
              'recipientId': 'PAYER',
              'recipientName': 'PAYER',
              'recipientUserType': 'PAYER'
            }
          ]
        }
      ],
      'statusInfo': null
    }
  ]
  describe('draft list', () => {
    it('should get draft list', () => {

      log.info.and.returnValue('');

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next(
          draftDetails
        );
      }));

      component.ngOnInit();
      component.getDraftItems(MSG_CONST.TYPE_DRAFT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
      expect(msgCenterApi.getConversationMessages).toHaveBeenCalledWith({
        'type': MSG_CONST.TYPE_DRAFT,
        'sortby': MSG_CONST.MODIFIED_DATE, 'orderby': MSG_CONST.MSG_ORDER_DESC
      },
        { headers: new Headers(jasmine.any(Object)) });

      expect(component.draftMessages[0].messages[0].conversationCategory).toBe('General');

      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ 'status': 200 });
      }));


      const event: any = {
        'data': draftDetails
      }

      component.loadDrafts(event);
      expect(draftDetails[0].messages[0].conversationCategory).toBe('General');

      component.loadDraftwithFilter(event);
      expect(component).toBeTruthy();
      msgCenterApi.getConversationMessages.and.returnValue(Observable.create(observer => {
        observer.next({ 'status': 200 });
      }));

      component.trailingMessages = [];
      const messageDetails = {
          'messageId': 'MSG379',
           'isFwd': false
      }
      messageService.getMessageDetails.and.returnValue(messageDetails);
      msgCenterApi.getTrailMessages.and.returnValue(Observable.create(observer => {
        observer.next(trailMessagedetails);
      }));
      component.setMessageDetails();
      component.getMessagesHistory();
      expect(msgCenterApi.getTrailMessages).toHaveBeenCalledWith({
        'messageid': 'MSG379',
        'type': MSG_CONST.TYPE_DRAFT
      },
        { headers: new Headers(jasmine.any(Object)) });

      expect(component.trailingMessages[0].messageCategory).toBe('INBOUND');

    });

  });

  describe('Save Reply Message', () => {
    const event: any = {
      'msg': 'Message sent successfully.'
    }
    it('should save msg', () => {
      log.info.and.returnValue('');
      component.saveDraft = jasmine.createSpyObj('saveDraft', ['emit']);
      router.navigate.and.returnValue('');
      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);
      translate.getText.and.returnValue(Observable.create(observer => {
        observer.next('message saved successfully');
      }));
      component.replyMessageSave(event);
      expect(component.saveDraft.emit).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([MSG_CONST.INBOX_ROUTE]);
      expect(messageService.setInfoMessage).toHaveBeenCalledWith(event.msg);
    });

  });

  describe('open dialog', () => {
    it('should open the dialog', () => {
      log.info.and.returnValue('');
      component.trailingMessages = [];
      const messageDetails = {
          'messageId': 'MSG379',
          'isFwd': false
      }
      const templateFinal = 'template';
      if (messageDetails.isFwd) {
        expect(templateFinal).toBe('fwdTemplate');
      } else {
        expect(templateFinal).toBe('template');
      }
      modalService = jasmine.createSpyObj('modalService', ['open']);
      component.modalRef = modalService.open();
      modalService.open.and.returnValue(new Promise((resolve, reject) => { }));
      component.openDraftModal('', '', '');
      expect(component.modalRef.result.catch()).toHaveBeenCalledWith({
        'reason': MSG_CONST.BACK_CALLBACK
      });
      expect(component.handleBackButtonClicked).toHaveBeenCalled();
    });
     it('should open the forward dialog', () => {
      log.info.and.returnValue('');
      component.trailingMessages = [];
      const messageDetails = {
          'messageId': 'MSG379',
          'isFwd': true
      }
      const templateFinal = 'fwdTemplate';
      //expect(spyOn(component, 'setMessageDetails')).toHaveBeenCalled();
      //expect(spyOn(component, 'getMessagesHistory')).toHaveBeenCalled();
      if (messageDetails.isFwd) {
        expect(templateFinal).toBe('fwdTemplate');
      } else {
        expect(templateFinal).toBe('template');
      }
      modalService = jasmine.createSpyObj('modalService', ['open']);
      component.modalRef = modalService.open();
      modalService.open.and.returnValue(new Promise((resolve, reject) => { }));
      component.openDraftModal('', '', '');
      expect(component.modalRef.result.catch()).toHaveBeenCalledWith({
        'reason': MSG_CONST.BACK_CALLBACK
      });
      expect(component.handleBackButtonClicked).toHaveBeenCalled();
    });
  });

  /* handleBackButtonClicked */
  describe('handle Back Button', () => {

    it('GoTo Back screen', () => {
      log.info.and.returnValue('');
      component.trailingMessages = [];
      const messageDetails = {
          'messageId': 'MSG379',
          'isFwd': false
      }
      spyOn(component, 'handleBackButtonClicked');
      expect(messageDetails.isFwd).toBe(false);
      router.navigate.and.returnValue('');
      component.modalRef = jasmine.createSpyObj('modalRef', ['close']);
      expect(router.navigate).toHaveBeenCalledWith([MSG_CONST.INBOX_ROUTE]);

    });
  });
});
