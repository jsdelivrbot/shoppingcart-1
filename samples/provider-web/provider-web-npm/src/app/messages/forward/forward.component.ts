import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Headers } from '@angular/http';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ForwardMessage,  Attachment, AttachmentInfo, PatientInfo, ClaimInfo, Recipients  } from './forwardmessage.model';
import * as mdmClient from '@tranzform/client-mdm/index';
import * as msProviderClient from '@tranzform/client-msprovider/index';
import { MessageConfigModule as MSG_CONST } from '../message-constant';
import { Subject } from 'rxjs/Subject';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { Logger } from 'angular2-logger/core';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { Observable } from 'rxjs/Observable';
import { MessagesService } from '../messages.service';
import { ModalService } from '@tranzform/common/modal';
@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.scss']
})
export class ForwardComponent implements OnInit {
  @Input() modalRef: NgbModalRef;
  @Input() trailingMessages: Array<any>;
  @Input() messageDetails: any;
  @Input() type: string;
  @Output() onSave = new EventEmitter();
  @ViewChild('forwardMessageForm') ForwardMessageForm;
  private messageType = MSG_CONST;
  msgBodyInvalid: Boolean = false;
  msgSubjectInvalid: Boolean = false;
  model: ForwardMessage = new ForwardMessage();

  categories = [];
  messageForList: any = [];
  sendToList: any = [];
  test: string;
  attachmentInfo;
  isDataLoaded = false;
  private messageFor = '';
  private sendTo = '';
  private recipientName = ''

  attachment : Attachment = null;

  constructor(
    private mdmApi: mdmClient.MasterDataManagementApi,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private translate: TranslationService,
    private msProviderClientApi: msProviderClient.ProviderApi,
    private log: Logger,
    private messageService: MessagesService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.getTrailingMessages();
  }
  private getMessageForward(): void {
    if (!this.type) {
      this.type = this.messageService.getMessageType();
    }
    let recipient = this.messageDetails.recipients[0];
    let msgContent = (this.type === this.messageType.TYPE_DRAFT) ? this.messageDetails.messageBody : '';
    this.model.message = msgContent;
    this.messageFor = recipient.recipientUserType;
    this.sendTo = recipient.recipientId;
    this.recipientName = recipient.recipientName;
      this.model.subject = this.messageDetails.subject;
    if (this.messageDetails.attachment && this.messageDetails.attachment.attachmentInfo) {
      this.attachmentInfo = this.messageDetails.attachment.attachmentInfo;
    }
    this.getUserCategories(MSG_CONST.MESSAGE_USER_CATEGORY);
    this.setSendToList();
    this.getCategories(MSG_CONST.MESSAGE_CATEGORY_TYPE);
    this.model.category = this.messageDetails.conversationCategory;
  }
  private getUserCategories(category) {
    this.log.info('getUserCategories start');
    const param: any = {
      'category': category
    };
    this.mdmApi.getCategories(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    ).subscribe((data: any) => {
      this.log.info('user categories data:' + data[0].data);
      this.messageForList = data;
    });
    this.log.info('getUserCategories end');
  }
  private getCategories(category) {
    const param: any = { 'category': category };
    this.mdmApi.getCategories(param,
      { headers: new Headers({ 'content-type': 'application/json' }) }
    ).subscribe((data: any) => {
      this.categories = data;
    });
  }
  setSendToList() {
    if (this.messageFor === MSG_CONST.MESSAGE_FOR_PROVIDER 
    || this.messageFor === MSG_CONST.MESSAGE_FOR_STAFF) {
      const param: any = { 'usertype': this.messageFor };
      this.msProviderClientApi.providerUsersGet(param,
        { headers: new Headers({ 'content-type': 'application/json' }) }
      ).subscribe((data: any) => {
        this.sendToList = [];
        data.forEach(user => {
          this.sendToList.push(
            {
              value: user.firstName + (user.middleName ? ' ' + user.middleName + ' ' : ' ') + user.lastName,
              code: user.EPEnrollmentId
            }
          );
        });
      });
    }
  }
  private getTrailingMessages(): void {
    const param: any = {
      'messageid': this.messageService.getMessageDetails().messageId,
      'type': this.type
    };
    this.msgCenterApi.getTrailMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      if (data && data[0]) {
        this.messageDetails = data[0];
      }
      /** adding the current messages to history for the forward */
       if (!this.type) {
        this.type = this.messageService.getMessageType();
      }
      if (this.type !== this.messageType.TYPE_DRAFT) {
        this.trailingMessages = data;
      }else {
        this.trailingMessages = data.slice(1, data.length);
      }
      this.log.info('Trailing message Services=>' + JSON.stringify(this.trailingMessages));
      this.getMessageForward();
      this.isDataLoaded = true;
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
    const msgExp = new RegExp("<[^>]*>|[\*]", "gm");
    if (msgExp.test(this.model.message)) {
      this.msgBodyInvalid = true;
    } else {
      this.msgBodyInvalid = false;
    }
  }
  openCancelConfirm() {
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
          this.log.info('Not confirmed')
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
  private saveToDrafts() {
    this.log.info('saveToDrafts start: model' + JSON.stringify(this.model));
    let recipients: Recipients = new Recipients();
    if (this.sendTo == '' || this.sendTo == undefined || this.sendTo == MSG_CONST.MESSAGE_FOR_PAYER) {
     recipients = new Recipients(MSG_CONST.MESSAGE_FOR_PAYER,
        MSG_CONST.MESSAGE_FOR_PAYER, MSG_CONST.MESSAGE_FOR_PAYER);
    }else{
       this.recipientName = this.getRecipient().value;
      recipients = new Recipients(this.sendTo, this.recipientName,
        this.messageFor);
    }
    this.model.recipients.push(recipients);
    this.model.messageId = this.messageDetails.messageId;
    //claim attachment       
    this.model.attachment = this.attachment;
    const param: any = this.model.transform(MSG_CONST.TYPE_DRAFT);
    this.msgCenterApi.saveMessageV2(param,
      { headers: new Headers({ 'content-type': 'application/json' }) }
    ).subscribe((data: any) => {
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
  }
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
  private getRecipient() {
    let recipient = this.sendToList.filter(user => user.code === this.sendTo)[0];
    return recipient;
  }
  private setRecipients(){
     let recipients: Recipients = new Recipients();
    if (this.sendTo == '' || this.sendTo == undefined || this.sendTo == MSG_CONST.MESSAGE_FOR_PAYER) {
     recipients = new Recipients(MSG_CONST.MESSAGE_FOR_PAYER,
        MSG_CONST.MESSAGE_FOR_PAYER, MSG_CONST.MESSAGE_FOR_PAYER);
    }else{
       this.recipientName = this.getRecipient().value;
      recipients = new Recipients(this.sendTo, this.recipientName,
        this.messageFor);
    }
    this.model.recipients.push(recipients);
  }
  forwardMessage() {
    this.log.info('Forward message started');
    this.setRecipients();
    this.model.messageId = this.messageDetails.messageId;
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
        .subscribe(successMsg => {
          this.onSave.emit({ 'msg': successMsg, 'type': 'send' });
        });

    },
    err => {
      this.log.info('Server Down Error:' + JSON.stringify(err));
      this.translate.getText('MSGCENTER.NEWMSG.ERROR')
        .subscribe( exception => {
          this.onSave.emit({'msg': exception});
        });
    });
    this.log.info('Forward message ended');
  }
   updateAttachmentInfo(event) {
    this.log.info('updateAttachmentInfo:' + JSON.stringify(event));
    this.attachment = event.attachment;
  }
}
