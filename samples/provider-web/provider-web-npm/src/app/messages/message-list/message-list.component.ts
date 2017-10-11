import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessagesService} from './../messages.service';
import { FilterOptions} from './../filter.options';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { Logger } from 'angular2-logger/core';
import { Router } from '@angular/router';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import { Headers } from '@angular/http';
import { ShellService } from '@tranzform/common/shell/shell.service';
import { AuthService } from './../../shared/authenticate/auth.service';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  @Input() messages = [];
  @Input() type = '';
  @Output() onDraftMsgClick = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onApplyFilter = new EventEmitter();

  openMoreOption = [];
  private messageType = MSG_CONST;
  
  constructor(private messageService: MessagesService,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private log: Logger,
    private shellService: ShellService,
    private router: Router,
    private authService: AuthService   
  ) { }



  moreOption(index, msgListSize) {
    if (!this.openMoreOption[index])
      this.openMoreOption[index] = true;
    else
      this.openMoreOption[index] = false;

    for (var i = 0; i < msgListSize; i++) {
      if (index != i) {
        this.openMoreOption[i] = false;
      }
    }
  }

  //handle the message detail click
  handleMessageDetailsClick(msgDetails, type): void {
    this.log.info("handleMessageDetailsClick started..");
    this.log.info("MessageDetails=>" + JSON.stringify(msgDetails) + ", type=>" + type);
    this.messageService.setMessageDetails(msgDetails);
    this.messageService.setMessageType(type);
    this.log.info('msgDetails.created date' + msgDetails.createdDate);
    if (type === MSG_CONST.TYPE_DRAFT) {
      this.onDraftMsgClick.emit({});
    } else {
      this.router.navigate([MSG_CONST.MSG_DETAIL_ROUTE]);
    }
    this.log.info("handleMessageDetailsClick finished..");
  }
  /** Method to fetch messagedetails  */
  msgReadStatus(msgDetails, type, index): void {
    this.log.info("msgReadStatus started..");
    this.log.info("MessageDetails=>" + JSON.stringify(msgDetails) + ", type=>" + type);
    this.log.info("msgReadStatus before updating is.." + msgDetails.read);
    if (type == MSG_CONST.TYPE_INBOX && msgDetails.readIndicator) {
      this.updateMsgReadStatus(msgDetails, MSG_CONST.MARK_UNREAD, false, index);
      this.log.info("Message status of  " + msgDetails.messageId + "is " + msgDetails.read)
    } else {
      this.updateMsgReadStatus(msgDetails, MSG_CONST.MARK_READ, true, index);
      this.log.info("MEssage status of  " + msgDetails.messageId + "is " + msgDetails.read)
    }
  }
  private inboxUnReadService() {
    const param: any = {
      'type': MSG_CONST.TYPE_INBOX,
      'sortby': MSG_CONST.MODIFIED_DATE,
      'orderby': MSG_CONST.MSG_ORDER_DESC,
      'readindicator': MSG_CONST.UNREAD
    };
    this.msgCenterApi.getConversationMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      if (data != undefined && data.metaInfo != undefined) {
        this.shellService.messageCount = data.metaInfo.unReadCount;
      }else{
        this.shellService.messageCount = undefined;
      }
    });
  }

  /** Method to update status of unread messages to read or vice versa */
  private updateMsgReadStatus(msgDetails: any, readStatus: String, readFlag: Boolean, index: any): void {
    this.log.info("updateMsgReadStatus started..")
    this.log.info("Message " + msgDetails.messageId + "is marked as read/Unread")
    let loggedInUserId = this.authService.currentUser.profile.tzfusername;
    this.log.info("Logged in user Id:" + loggedInUserId);
    let param: any = {
      'messageid': msgDetails.messageId,
      'readtype': readStatus,
      'userid': loggedInUserId
    };
    this.msgCenterApi.updateReadIndicatorV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      msgDetails.readIndicator = readFlag;
      this.openMoreOption[index] = false;  /** Line added to close the options right after it is marked */
      /* If msg is read to unread we need to update count */
      this.inboxUnReadService();
      this.applyFilter();
      this.log.info("Mark as read service Services=>" + JSON.stringify(msgDetails));
    });
    this.log.info("updateMsgReadStatus ended..")
  }

  /* Applying filter on selected category and status */
  applyFilter() {
    let filterOpts = this.messageService.getFilterOptions();
    if(filterOpts.messageStatus!='ALL'){
      const param: any = {
        'type': this.type,
        'sortby': MSG_CONST.MODIFIED_DATE,
        'orderby': MSG_CONST.MSG_ORDER_DESC,
        'conversationcategory': filterOpts.category,
        'readindicator': filterOpts.messageStatus
      };
      this.msgCenterApi.getConversationMessagesV2(param, {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).subscribe((data: any) => {
        this.onApplyFilter.emit({ 'data': data, 'messageStatus': filterOpts.messageStatus });    
      });
  }
  }


  // delete the message from inbox,send and drafts folder
  deleteMsg(msgDetails, type, index): void {
    this.log.info('deleteMsg started..');
    const params: any = {
      messageid: msgDetails.messageId,
      type: type
    };
    this.log.info('params=>' + params + ',type:' + type);

    this.msgCenterApi.deleteMessageV2(params, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.log.info('Deleted successfuly=>' + JSON.stringify(msgDetails));
      // route to inbox folder,if type is inbox
      // resolve the type
      // this.router.navigateByUrl(MSG_CONST.INBOX_ROUTE);
      this.moreOption(index, this.messages.length);

      this.inboxUnReadService();

      // notify the inbox
      this.onDelete.emit({ 'type': type });
    });

    this.log.info('deleteMsg finished..');

  }

}
