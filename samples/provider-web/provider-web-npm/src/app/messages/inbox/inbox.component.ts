import { Component, OnInit, Input } from '@angular/core';
import { Headers } from '@angular/http';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { Logger } from 'angular2-logger/core';
import { CapitalizePipe } from '.././pipe/capitalize-pipe.component';
@Component({
  selector: 'app-inbox-component',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  MSG_INFO_ID: string = "mailInfoMsg";
  STYLE: string = 'style';
  MSG_SHOW: string = 'display:block !important';
  messageStatus: any = '';

  private draftInfoMsg: string;
  private showMsg: string;
  private messageType = MSG_CONST;
  inboxMessages: msgcenterClient.MessageListVO;
  public inboxcount: number;
  constructor(
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private translate: TranslationService,
    private log: Logger) { }


  getInboxDetails(type: string, sortby: string, orderby: string) {
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
      this.inboxMessages = data;
      this.inboxcount = (this.inboxMessages.messages ? this.inboxMessages.messages.length : 0);
    });
  }

  ngOnInit() {
    this.messageStatus = MSG_CONST.MESSAGE_STATUS_ALL;
    this.getInboxDetails(MSG_CONST.TYPE_INBOX, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
  }

  loadInbox(event) {
    this.log.info('loadInbox started...');
    this.log.info('event type:' + event.type);
    this.getInboxDetails(MSG_CONST.TYPE_INBOX, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
    this.log.info('loadInbox finished...');
  }

  loadInboxwithFilter(event) {
    this.log.info('Filtered Inbox data - >' + JSON.stringify(event));
    this.inboxMessages = event.data;
    this.messageStatus = event.messageStatus;
    this.inboxcount = (this.inboxMessages.messages ? this.inboxMessages.messages.length : 0);
  }
}
