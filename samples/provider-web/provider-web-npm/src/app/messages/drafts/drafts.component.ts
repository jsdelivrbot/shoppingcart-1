import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { MessagesService } from './../messages.service';
import { Headers } from '@angular/http';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { MessageConfigModule as MSG_CONST} from './../message-constant';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import { Router } from '@angular/router';
import { Logger } from 'angular2-logger/core';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { AttachmentInfo } from './../reply/replymessage.model';
@Component({
  selector: 'app-drafts-component',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {
  private messageDetails: any;
  public trailingMessages: Array<any>=[];
  private attachmentInfo:AttachmentInfo[] = [];

  constructor(private messageService: MessagesService,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private modalService: NgbModal,
    private router:Router,
    private log: Logger,
    private translate: TranslationService) { }

  draftMessages: msgcenterClient.MessageListVO;
  @Input() modalRef: NgbModalRef;
  @Output() saveDraft = new EventEmitter();
  showMsg:string;
  draftCount:number;
  private messageType = MSG_CONST;

  getDraftItems(type: string, sortby: string, orderby: string) {
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
      this.draftMessages = data;
      this.draftCount = (this.draftMessages.messages ? this.draftMessages.messages.length : 0);
      this.messageService.setDraftBadge(this.draftCount);
    });
  }
  openDraftModal(event, template, fwdTemplate) {
    this.getMessagesHistory();
    //this.setMessageDetails();
    let templateFinal = this.messageService.getMessageDetails().isFwd ? fwdTemplate : template;
    this.modalRef = this.modalService.open(templateFinal, <any>{
      size: 'lg', windowClass: 'draft-message-modal',
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
    this.log.info('handleBackButtonClicked started');
    this.trailingMessages = [];
    this.modalRef.close();
    if(!this.messageDetails.isFwd){
    this.router.navigate([MSG_CONST.INBOX_ROUTE], {});
    }
    this.log.info('handleBackButtonClicked finished');
  }
  /*public setMessageDetails(): void {
    this.log.info('setMessageDetails started..');
    this.messageDetails = this.messageService.getMessageDetails();
    this.log.info('setMessageDetails finished..');
  }*/
  setMessageDetails(messageDetails): void {
    this.log.info("setMessageDetails started..");
    
    this.messageDetails = messageDetails;
    if(messageDetails.attachment){
     this.attachmentInfo = messageDetails.attachment.attachmentInfo;
    }
    this.log.info("MessageDetailsComponent=>" + JSON.stringify(this.messageDetails));
    this.log.info("setMessageDetails finished..");
  }

  public getMessagesHistory():void{
    /**
     * Clear the previous data
     */
    let param: any = {
            //'messageid': this.messageDetails.messageId,
            'messageid': this.messageService.getMessageDetails().messageId,
            //'type': this.messageService.getMessageType()
            'type': MSG_CONST.TYPE_DRAFT
    };
    this.msgCenterApi.getTrailMessagesV2(param,{
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.trailingMessages = [];
      //this.trailingMessages.push.apply(this.trailingMessages, data);
      this.log.info('Trailing message Services=>' + JSON.stringify(this.trailingMessages));

      this.setMessageDetails(data[0]);
      this.trailingMessages = data.slice(1,data.length);
    },
    error => {
      this.log.error('Error:' + JSON.stringify(error));
    });
  }
  ngOnInit() {
    this.getDraftItems(MSG_CONST.TYPE_DRAFT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
  }

  replyMessageSave (event) {
    this.log.info('replyMessageSave called');
    this.log.info(event.msg);
    this.showMsg = event.msg;
    this.modalRef.close();
    this.saveDraft.emit({});
    this.router.navigate([MSG_CONST.INBOX_ROUTE]);
    this.translate.getText('MSGCENTER.NEWMSG.ERROR')
    .subscribe(exception => {
      if (this.showMsg === exception) {
        this.messageService.setErrorMessage(this.showMsg);
      }else {
        this.messageService.setInfoMessage(this.showMsg);
      }
    });
    this.log.info('replyMessageSave ended');
  }

   loadDrafts(event){
    this.log.info('loadDrafts started...');
    this.log.info('event type:' + event.type);
    this.getDraftItems(MSG_CONST.TYPE_DRAFT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
    this.log.info('loadDrafts finished...');
  }

  loadDraftwithFilter(event){
    this.log.info("Filtered Draft Details -> " + event.data);
    this.draftMessages = event.data;
    this.draftCount = (this.draftMessages.messages ? this.draftMessages.messages.length : 0);
  }
}
