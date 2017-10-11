import { Component, OnInit, Input } from '@angular/core';

import { Headers } from '@angular/http';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'app-sent-component',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

  constructor(
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private log: Logger) { }

  sentMessages: msgcenterClient.MessageListVO;
  sentCount: number;
  private messageType = MSG_CONST;

  getSentItems(type: string, sortby: string, orderby: string) {
    const param: any = {
      'type': type,
      'sortby': sortby,
      'orderby': orderby
    };
    this.msgCenterApi.getConversationMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.sentMessages = data;
      this.sentCount = (this.sentMessages.messages ? this.sentMessages.messages.length : 0);
    });
  }

  ngOnInit() {
    this.getSentItems(MSG_CONST.TYPE_SENT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
  }

  loadSentItems(event) {
    this.log.info('loadSentItems started...');
    this.log.info('event type:' + event.type);
    this.getSentItems(MSG_CONST.TYPE_SENT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
    this.log.info('loadSentItems finished...');
  }

  loadSentwithFilter(event) {
    this.log.info('Filtered Sent data - >' + event.data);
    this.sentMessages = event.data;
    this.sentCount = (this.sentMessages.messages ? this.sentMessages.messages.length : 0);
  }
}
