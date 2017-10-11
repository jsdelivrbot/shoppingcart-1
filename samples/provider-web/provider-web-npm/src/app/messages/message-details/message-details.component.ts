import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { MessagesService } from './../messages.service';
import { Logger } from 'angular2-logger/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { MessageConfigModule as MSG_CONST } from './../message-constant';
import * as msgCenterClient from '@tranzform/client-msgcenter/index';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import { ShellService } from '@tranzform/common/shell/shell.service';
import { Subscription } from 'rxjs/Subscription';
import { CapitalizePipe } from '.././pipe/capitalize-pipe.component';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { AuthService } from './../../shared/authenticate/auth.service';
import { ClaimInfo, AttachmentInfo, Attachment, PatientInfo } from './../compose-mail/composemail.model';
import * as mdmClient from '@tranzform/client-mdm/index';
import { ClaimFormService } from './../../claimStatusInquiry/claim-form.service';
@Component({
  selector: 'message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit, OnDestroy {
  @Input() modalRef: NgbModalRef;
  private messageDetails: any;
  private trailingMessages: Array<any> = [];
  private type: string;
  private messageType = MSG_CONST;
  messageFor: any= '';
  savedMsg: boolean = false;
  isError: boolean= false;
  showMsg: String;
  FORWARD_SLASH: string = "/";
  msgSubscription: Subscription;
  errorSubscription: Subscription;
  messageForMap: any = {};
  private attachmentInfo:AttachmentInfo[] = [];


  constructor(private messageService: MessagesService,
    private msgCenterApi: msgCenterClient.MessageCenterV2Api,
    private log: Logger,
    private router: Router,
    private modalService: NgbModal,
    private shellService: ShellService,
    private translate: TranslationService,
    private authService: AuthService,
    private mdmApi: mdmClient.MasterDataManagementApi,
    private claimFormService: ClaimFormService) {
    /**
      * Error handling for send message
    */
    this.msgSubscription = this.messageService.getInfoMessage().subscribe(message => {
        if (message) {
          this.showMsg = message.text;
          this.savedMsg = true;
          setTimeout(() => {
            this.savedMsg = false;
            this.messageService.clearInfoMessage();
          }, MSG_CONST.INFO_MSG_IDLE_TIME);
        }
    });
    /**
     * Error Handling for save to draft message
     */
    this.errorSubscription = this.messageService.getErrorMessage().subscribe(error => {
      if (error) {
        this.showMsg = error.text;
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
          this.messageService.clearErrorMessage();
        }, MSG_CONST.INFO_MSG_IDLE_TIME);
      }
    });
  }

  ngOnInit() {
    //this.setMessageDetails(this.messageService.getMessageDetails());
    this.getMessagesHistory();
  }
  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
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
  setMessageDetails(messageDetails): void {
    this.log.info("setMessageDetails started..");
    this.setMessageForMap(MSG_CONST.MESSAGE_USER_CATEGORY);
    this.messageDetails = messageDetails;
    this.messageFor = this.messageDetails.recipients[0].recipientUserType;
    this.type = this.messageService.getMessageType();
    if(messageDetails.attachment) {
     this.attachmentInfo = messageDetails.attachment.attachmentInfo;
    }
    if (this.type == MSG_CONST.TYPE_INBOX && !this.messageDetails.read) {
      this.updateMsgRead();
    }
    this.log.info("MessageDetailsComponent=>" + JSON.stringify(this.messageDetails) +
      ",type=>" + this.type);
    this.log.info("setMessageDetails finished..");
  }

  private updateMsgRead(): void {
    this.log.info("Message " + this.messageDetails.messageId + "is marked as read");
    if(this.authService.currentUser){
    let loggedInUserId = this.authService.currentUser.profile.tzfusername;
    this.log.info("Logged in user Id:" + loggedInUserId);
    let param: any = {
      'messageid': this.messageDetails.messageId,
      'readtype': MSG_CONST.MARK_READ,
      'userid': loggedInUserId
    };
    this.msgCenterApi.updateReadIndicatorV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.messageDetails.read = true;
      this.inboxUnReadService();
      this.log.info("Mark as read service Services=>" + JSON.stringify(this.messageDetails));
    });
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
      } else {
        this.shellService.messageCount = undefined;
      }
    });
  }

  private getMessagesHistory(): void {
    let param: any = {
      'messageid': this.messageService.getMessageDetails().messageId,
      'type': this.messageService.getMessageType()
    };
    this.msgCenterApi.getTrailMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      if(data && data.length>0)
      this.setMessageDetails(data[0]);
      this.trailingMessages = data.slice(1,data.length);
      this.log.info("Trailing message Services=>" + JSON.stringify(this.trailingMessages));
    });
  }



  public createDate(dateString): Date {
    return new Date(dateString);
  }

  openReplyModal(template) {
    this.modalRef = this.modalService.open(template, <any>{
      size: 'lg', windowClass: 'reply-message-modal',
      backdrop: 'static', keyboard: false
    });

    this.modalRef.result.catch(reason => {
      this.log.info('Modal closed by user: ' + reason);
      if (reason === MSG_CONST.BACK_CALLBACK) {
        this.handleBackButtonClicked();
      }
    });
  }

  handleBackButtonClicked() {
    this.log.info("handleBackButtonClicked finished");
    this.modalRef.close();
    this.log.info("handleBackButtonClicked finished");
  }


  handleMsgDetailBtnClicked() {
    this.log.info("handleMsgDetailBtnClicked started");
    this.router.navigate([MSG_CONST.INBOX_ROUTE], {});
    this.log.info("handleMsgDetailBtnClicked finished");
  }
  replyMessageSave(event) {
    this.log.info("replyMessageSave called");
    this.log.info(event.msg);
    this.savedMsg = false;
    this.showMsg = event.msg
    this.translate.getText('MSGCENTER.NEWMSG.ERROR')
      .subscribe(exception => {
        if (this.showMsg === exception) {
          this.log.info('Server Error');
          this.isError = true;
        }else {
          this.savedMsg = true;
        }
        setTimeout(() => {
          this.savedMsg = false;
          this.isError = false;
        }, MSG_CONST.INFO_MSG_IDLE_TIME);
    });
    this.modalRef.close();
    this.log.info("replyMessageSave ended");
  }

  openForwardModal(template) {
    this.modalRef = this.modalService.open(template, <any>{
      size: 'lg', windowClass: 'forward-message-modal',
      backdrop: 'static', keyboard: false
    });

    this.modalRef.result.catch(reason => {
      this.log.info('Modal closed by user: ' + reason);
      if (reason === MSG_CONST.BACK_CALLBACK) {
        this.handleBackButtonClicked();
      }
    });
  }


 @HostListener('click', ['$event.target'])
 openClaimDetailModal(template, claimId) {
   //setting the claimId
   this.log.info('ClaimDetail=>' + claimId);
   this.claimFormService.setFormData(claimId);
    this.modalRef = this.modalService.open(template, <any>{
      size: 'lg', windowClass: 'claimdetail-message-modal',
      backdrop: 'static', keyboard: false
    });

    this.modalRef.result.catch(reason => {
      this.log.info('Modal closed by claim detail: ' + reason);
    });
    event.preventDefault();
    event.stopPropagation();
  }


  // delete the message from inbox,send and drafts folder
  deleteMsg(msgDetails): void {
    this.log.info('deleteMsg started..');
    const params: any = {      
      messageid: msgDetails.messageId,
      type: this.type
    };
    this.log.info('params=>' + params + ',type:' + this.type);

    this.msgCenterApi.deleteMessageV2(params, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.log.info('Deleted successfuly=>' + JSON.stringify(msgDetails));
      this.log.info('Routing initated ....=>' + this.type);
      // route to inbox or sent folder,if type is inbox or sent      
      if (this.type == MSG_CONST.TYPE_INBOX) {
        this.router.navigate([MSG_CONST.INBOX_ROUTE], {});
      } else if (this.type == MSG_CONST.TYPE_SENT) {
        this.router.navigate([MSG_CONST.SENT_ROUTE], {});
      }
      this.log.info('Routing Done ....');

    });

    this.log.info('deleteMsg finished..');

  }
}
