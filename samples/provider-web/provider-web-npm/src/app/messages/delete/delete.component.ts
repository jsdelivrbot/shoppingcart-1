import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from './../messages.service';
import { Headers } from '@angular/http';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { MessageConfigModule as MSG_CONST} from './../message-constant';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(private msgCenterApi: msgcenterClient.MessageCenterV2Api, private log: Logger) { }

  deletedMessages: msgcenterClient.MessageListVO;
  deleteCount:number;
  private messageType = MSG_CONST;
  getDeleteItems(type: string, sortby: string, orderby: string) {
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
      this.deletedMessages = data;
      this.deleteCount= (this.deletedMessages.messages ? this.deletedMessages.messages.length : 0);
    });
  }

  ngOnInit() {
    this.getDeleteItems(MSG_CONST.TYPE_DELETE, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
  }

  loadDeletewithFilter(event){
    this.log.info('Filtered Delete data - >' + event.data);
    this.deletedMessages = event.data;
    this.deleteCount = (this.deletedMessages.messages ? this.deletedMessages.messages.length : 0);
  }
}
