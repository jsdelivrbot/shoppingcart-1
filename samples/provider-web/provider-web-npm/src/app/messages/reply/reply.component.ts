import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Headers } from '@angular/http';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReplyMessage, Attachment, AttachmentInfo, PatientInfo, ClaimInfo, Recipients } from './replymessage.model';
import *  as mdmClient from '@tranzform/client-mdm/index';
import * as msProviderClient from '@tranzform/client-msprovider/index';
import { MessageConfigModule as MSG_CONST } from "../message-constant";
import { Subject } from 'rxjs/Subject';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { Logger } from 'angular2-logger/core';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { Observable } from 'rxjs';
import { MessagesService } from '../messages.service';
import { CapitalizePipe } from '.././pipe/capitalize-pipe.component';
@Component({
  selector: 'app-reply-component',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  // get the ref of the modal dialog
  @Input() modalRef: NgbModalRef;
  @Input() trailingMessages: Array<any>;
  @Output() onSave = new EventEmitter();
  @ViewChild('replyMessageForm') ReplyMessageForm;

  msgSubjectInvalid: Boolean = false;
  private messageDetails: any;
  private type: string;
  private messageType = MSG_CONST;

  private messageFor = '';
  private sendTo = '';
  private recipientName = ''

  msgBodyInvalid: Boolean = false;
  model: ReplyMessage = new ReplyMessage();

  categories = [];
  messageForList: any = [];
  messageForMap: any = {};
  sendToList: any = [];
  isDataLoaded = false;
  attachment: Attachment = null;
  attachmentInfo;

  constructor(
    private mdmApi: mdmClient.MasterDataManagementApi,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private modalService: ModalService,
    private translate: TranslationService,
    private msProviderClientApi: msProviderClient.ProviderApi,
    private log: Logger,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.getMessagesHistory();
  }
  private setMessageForMap(category) {
        const param: any = {
      'category': category
    };
    this.mdmApi.getCategories(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      data[0].data.forEach(user => {
        let code = user.code;
        let val = user.value;
        this.messageForMap[code] = val;
      });
    });
  }
  private getMessageReply(): void {
    this.log.info('getMessageReply started..');
    //this.messageDetails = this.messageService.getMessageDetails();

    this.type = this.messageService.getMessageType();
    this.log.info('MessageDetailsComponent=>' + JSON.stringify(this.messageDetails) +
      ',type=>' + this.type);
    /** get Message for list */
    if (this.type === MSG_CONST.TYPE_DRAFT && this.trailingMessages.length === 0) {
      this.log.info('--getUserCategories start---');
      this.getUserCategories(MSG_CONST.MESSAGE_USER_CATEGORY);
      this.getCategories(MSG_CONST.MESSAGE_CATEGORY_TYPE);
      this.log.info('--getUserCategories End---');
    }else {
      this.setMessageForMap(MSG_CONST.MESSAGE_USER_CATEGORY);
    }
    let msgBodyContent = (this.type === MSG_CONST.TYPE_DRAFT) ? this.messageDetails.messageBody : '';

    if (!(this.type === this.messageType.TYPE_DRAFT
      && this.trailingMessages.length === 0)) {
      let sender = this.messageDetails.sender;
      this.messageFor = sender.senderUserType;
      this.sendTo = sender.senderId;
      this.recipientName = sender.senderName;
    } else {
      let recipient = this.messageDetails.recipients[0];
      this.messageFor = recipient.recipientUserType;
      this.sendTo = recipient.recipientId;
      this.recipientName = recipient.recipientName;
    }
    this.model.messageId = this.messageDetails.messageId;
    this.model.category = this.messageDetails.conversationCategory;
    this.model.subject = this.messageDetails.subject;
    this.model.message = msgBodyContent;
    if (this.type === MSG_CONST.TYPE_DRAFT && this.messageDetails.attachment) {
      this.attachmentInfo = this.messageDetails.attachment.attachmentInfo;
    }
  }

  // categories list based on category
  getCategories(category: string) {
    const param: any = {
      'category': category
    };
    // TODO once environment is up will remove
    this.mdmApi.getCategories(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.categories = data;
      this.log.info('Categories:' + JSON.stringify(this.categories[0].data));
    });
  }
  private getTrailingMessages(): void {
    let param: any = {
      'messageid': this.messageDetails.messageId,
      'type': this.type
    };
    this.msgCenterApi.getTrailMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.trailingMessages.push.apply(this.trailingMessages, data);
      this.log.info('Trailing message Services=>' + JSON.stringify(this.trailingMessages));
    });
  }

  // validate the subject and message body
  validateMsgText(text, isSubj) {
    const msg_exp = new RegExp('<[^>]*>|[\*]', 'gm');
    if (msg_exp.test(text)) {
      if (isSubj) {
        this.msgSubjectInvalid = true;
      } else {
        this.msgBodyInvalid = true;
      }
    } else {
      if (isSubj) {
        this.msgSubjectInvalid = false;
      } else {
        this.msgBodyInvalid = false;
      }
    }
  }
  validateMsgBody() {
    let msgExp = new RegExp("<[^>]*>|[\*]", "gm");
    if (msgExp.test(this.model.message)) {
      this.msgBodyInvalid = true;
   } else {
      this.msgBodyInvalid = false;
    }
  }
  public getRecipient() {
    let recipient = this.sendToList.filter(user => user.code === this.sendTo)[0];
    return recipient;
  }
  replyMessage() {
    this.log.info('Reply to message started');

    let recipients: Recipients = new Recipients(this.sendTo, this.recipientName,
      this.messageFor);
    if (this.messageFor !== this.messageType.MESSAGE_FOR_PAYER
      && this.type === this.messageType.TYPE_DRAFT
      && this.trailingMessages.length === 0) {
      this.recipientName = this.getRecipient().value;
      recipients = new Recipients(this.sendTo, this.recipientName,
        this.messageFor);
    }
    if (this.sendTo == '' || this.sendTo == undefined) {
      recipients = new Recipients(MSG_CONST.MESSAGE_FOR_PAYER,
        MSG_CONST.MESSAGE_FOR_PAYER, MSG_CONST.MESSAGE_FOR_PAYER);
    }
    this.model.recipients.push(recipients);
    //claim attachment       
    this.model.attachment = this.attachment;

    const param: any = this.model.transform(MSG_CONST.TYPE_SEND);
    this.log.info('Params ::' + param);

    this.msgCenterApi.saveMessageV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.translate.getText('MSGCENTER.NEWMSG.SUCCESS')
        .subscribe(p => {
          this.onSave.emit({ 'msg': p, 'type': 'send' });
        });
    },
      err => {
        this.log.info('Server Down Error:' + JSON.stringify(err));
        this.translate.getText('MSGCENTER.NEWMSG.ERROR')
          .subscribe(exception => {
            this.onSave.emit({ 'msg': exception });
          });
      });
    this.log.info('Reply to message ended');
  }
  openConfirm() {
    if (this.model.message.trim().length > 0) {
      let confirmMsgBody: string;
      let confirmTitle: string;
      let yes: string;
      let no: string;

      this.translate.getText('MSGCENTER.CANCEL_TITLE').subscribe(p => {
        confirmTitle = p;
      });

      this.translate.getText('MSGCENTER.CANCEL_CONFIRMATION').subscribe(p => {
        confirmMsgBody = p;
      });

      this.translate.getText('MSGCENTER.YES').subscribe(p => {
        yes = p;
      });

      this.translate.getText('MSGCENTER.NO').subscribe(p => {
        no = p;
      });

      this.modalService.confirm({
        headerText: confirmTitle,
        message: [
          confirmMsgBody
        ],
        cancelText: no,
        okText: yes,
      })
        .then(
        () => {
          this.log.info('Confirmed');
          this.modalRef.close();
        },
        () => {
          this.log.info('Not confirmed');
        }
        );
    } else {
      this.modalRef.close();
    }
  }
  openSaveDraftConfirm() {
    let confirmMsgBody: string;
    let confirmTitle: string;
    let yes: string;
    let no: string;

    this.translate.getText('MSGCENTER.SAVE_DRAFT_CONFIRMATION_TITLE').subscribe(p => {
      confirmTitle = p;
    });

    this.translate.getText('MSGCENTER.SAVE_DRAFT_CONFIRMATION_LABEL').subscribe(p => {
      confirmMsgBody = p;
    });

    this.translate.getText('MSGCENTER.YES').subscribe(p => {
      yes = p;
    });

    this.translate.getText('MSGCENTER.NO').subscribe(p => {
      no = p;
    });

    this.modalService.confirm({
     headerText: confirmTitle,
      message: [
        confirmMsgBody
      ],
      cancelText: no,
      okText: yes,
    })
      .then(
      () => {
        this.log.info('Confirmed');
        this.saveToDrafts();
        this.modalRef.close();
      },
      () => {
        this.log.info('Not confirmed');
      }
      );
  }
  saveToDrafts() {
    let recipients: Recipients = new Recipients(this.sendTo, this.recipientName,
      this.messageFor);
    if (this.sendTo == '' || this.sendTo == undefined) {
      recipients = new Recipients(MSG_CONST.MESSAGE_FOR_PAYER,
        MSG_CONST.MESSAGE_FOR_PAYER, MSG_CONST.MESSAGE_FOR_PAYER);
    }
    this.model.recipients.push(recipients);
    this.model.attachment = this.attachment;

    this.log.info('save as draft started');
    const param: any = this.model.transform(MSG_CONST.TYPE_DRAFT);

    this.log.info('Params ::' + param);

    this.msgCenterApi.saveMessageV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.translate.getText('MSGCENTER.SAVE_DRAFT_SUCCESSFUL')
        .subscribe(successMsg => {
          this.messageService.setInfoMessage(successMsg);
        });
      this.getDraftItems(MSG_CONST.TYPE_DRAFT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
    },
      err => {
        this.log.info('Server Down Error:' + JSON.stringify(err));
        this.translate.getText('MSGCENTER.NEWMSG.DRAFT_ERROR')
          .subscribe(exception => {
            this.messageService.setErrorMessage(exception);
          });
      });
    this.log.info('save as drafts ended');
  }

  //draft count
  private getDraftItems(type: string, sortby: string, orderby: string) {
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
      const draftMessages = data;
      const draftCount = (draftMessages.messages ? draftMessages.messages.length : 0);
      this.messageService.setDraftBadge(draftCount);
    });
  }
  // User categories list 
  getUserCategories(category: string) {
    const param: any = {
      'category': category
    };
    // TODO once environment is up will remove
    this.mdmApi.getCategories(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.messageForList = data;
      data[0].data.forEach(user => {
        let code = user.code;
        let val = user.value;
        this.messageForMap[code] = val;
      });
      this.setSendToList();
      this.log.info('User Categories:' + JSON.stringify(this.messageForList[0].data));
    });
  }
  setSendToList() {
    this.log.info('---setSendToList Start----');
    this.sendToList = [];
    if (this.messageFor === MSG_CONST.MESSAGE_FOR_PROVIDER
      || this.messageFor === MSG_CONST.MESSAGE_FOR_STAFF) {
      this.getUserList(this.messageFor);
    }
    this.log.info('---setSendToList End----');
  }

  getUserList(userType) {
    const param: any = { 'usertype': userType };
    this.msProviderClientApi.providerUsersGet(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      data.forEach(user => {
        this.sendToList.push(
          {
            value: user.firstName + (user.middleName ? ' ' + user.middleName + ' ' : ' ') + user.lastName,
            code: user.EPEnrollmentId
          }
        );
      });
      this.log.info('Send To List' + this.sendToList);
    });
  }
  updateAttachmentInfo(event) {
    this.log.info('updateAttachmentInfo:' + JSON.stringify(event));
    this.attachment = event.attachment;
  }

  public getMessagesHistory(): void {
    /**
     * Clear the previous data
     */
    let param: any = {
      //'messageid': this.messageDetails.messageId,
      'messageid': this.messageService.getMessageDetails().messageId,
      //'type': this.messageService.getMessageType()
      'type': MSG_CONST.TYPE_DRAFT
    };
    this.msgCenterApi.getTrailMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.trailingMessages = [];
      this.messageDetails = data[0];
      if (this.messageService.getMessageType() !== this.messageType.TYPE_DRAFT) {
        this.trailingMessages = data;
      }else {
        this.trailingMessages = data.slice(1, data.length);
      }
      this.getMessageReply();
      this.isDataLoaded = true;
    },
      error => {
        this.log.error('Error:' + JSON.stringify(error));
      });
  }
  setMessageDetails(messageDetails): void {
    this.log.info("setMessageDetails started..");

    this.messageDetails = messageDetails;
    if (messageDetails.attachment) {
      this.attachmentInfo = messageDetails.attachment.attachmentInfo;
    }
    this.log.info("MessageDetailsComponent=>" + JSON.stringify(this.messageDetails));
    this.log.info("setMessageDetails finished..");
  }

}


