import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ContentChild } from '@angular/core';
import { Headers } from '@angular/http';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComposeMail,Attachment,AttachmentInfo,PatientInfo,ClaimInfo, Recipients } from './composemail.model';
import * as mdmClient from '@tranzform/client-mdm/index';
import { MessageConfigModule as MSG_CONST } from '../message-constant';
import { Subject } from 'rxjs/Subject';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import * as msProviderClient from '@tranzform/client-msprovider/index';
import { Logger } from 'angular2-logger/core';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { Observable } from 'rxjs/Observable';
import { MessagesService } from '../messages.service';
import { ClaimsPatient } from '../claims-patient-search/claimspatient.model';
import { TabsComponent } from '@tranzform/common/tabs/tabs.component';
@Component({
  selector: 'app-compose-mail-modal',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailModalComponent implements OnInit {

  // get the ref of the modal dialog
  @Input() modalRef: NgbModalRef;

  @Output() onSave = new EventEmitter();

  @ViewChild('composeMailForm') composeMailForm;
  @ViewChild(TabsComponent) tabs: any;

  msgSubjectInvalid: Boolean = false;

  msgBodyInvalid: Boolean = false;

  model: ComposeMail = new ComposeMail();

  attachment : Attachment = null;
  

  private MSG_CNTR_CONST = MSG_CONST;
  categories: any = [];
  messageForList: any = [];
  sendToList: any = [];
  claimInfo: ClaimInfo[] = [];
  private claimsPatient: ClaimsPatient;
  private isClaimSearchValid: true;

  private messageFor = '';
  private sendTo = '';

  constructor(
    private mdmApi: mdmClient.MasterDataManagementApi,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private modalService: ModalService,
    private translate: TranslationService,
    private msProviderClientApi: msProviderClient.ProviderApi,
    private messageService: MessagesService,
    private log: Logger
  ) {}

  ngOnInit() {
    this.getCategories(MSG_CONST.MESSAGE_CATEGORY_TYPE);
    this.getUserCategories(MSG_CONST.MESSAGE_USER_CATEGORY);
    this.claimsPatient = new ClaimsPatient();
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
 
  //reset claims model
  resetClaimsPatient(){
    //console.log('reset called..');
    this.claimsPatient = new ClaimsPatient();

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
      this.log.info('User Categories:' + JSON.stringify(this.messageForList[0].data));
    });
  }

  // compose mail json format
  currentComposeMail() {
    return JSON.stringify(this.model);
  }
  private getRecipientName(userId) {
    return this.sendToList.filter(x => x.code === userId);
  }

  // save the composed mail
  composeMail() {
    this.log.info('save compose mail started');
    let recipients: Recipients = new Recipients();
    if (this.sendTo == '' || this.sendTo == undefined) {
      recipients = new Recipients(MSG_CONST.MESSAGE_FOR_PAYER, 
      MSG_CONST.MESSAGE_FOR_PAYER, MSG_CONST.MESSAGE_FOR_PAYER);      
    } else {
      let recipientName = this.getRecipientName(this.sendTo)[0].value;
      recipients = new Recipients(this.sendTo, recipientName, 
       this.messageFor);     
    }
    this.model.recipients.push(recipients);
   //claim attachment       
    this.model.attachment = this.attachment;
   
    const param: any = this.model.transform(MSG_CONST.TYPE_SEND);

    console.log(JSON.stringify(param));

    // TODO once environment is up will remove
    this.msgCenterApi.saveMessageV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.translate.getText('MSGCENTER.NEWMSG.SUCCESS')
        .subscribe(p => {
          this.onSave.emit({ 'msg': p });
          this.log.info('msg->' + p);
        });
    },
    err => {
      this.log.info('Server Down Error:' + JSON.stringify(err));
      this.translate.getText('MSGCENTER.NEWMSG.ERROR')
        .subscribe( exception => {
          this.onSave.emit({'msg': exception});
        });
    });

    this.log.info('save compose mail ended');
  }

  // confirmation dialog window
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

  /** draft confirm dialog window */
  draftConfirm() {
    this.log.info('draftConfirm Started...');
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
        this.log.info('Confirmed invoking draft service');
        /** invoke the draft service to save*/
        this.saveToDrafts();
        this.modalRef.close();
      },
      () => {
        this.log.info('Not confirmed');
      }
      );
    this.log.info('draftConfirm Finished...');
  }
  /** save the conversation as drafts*/
  saveToDrafts() {
    this.log.info('save as draft started');
    let recipients: Recipients = new Recipients();
    if (this.sendTo == '' || this.sendTo == undefined) {
      recipients = new Recipients(MSG_CONST.MESSAGE_FOR_PAYER, 
      MSG_CONST.MESSAGE_FOR_PAYER, MSG_CONST.MESSAGE_FOR_PAYER);
      
     /* this.model.recipientUserType = MSG_CONST.MESSAGE_FOR_PAYER;
      this.model.recipientName = MSG_CONST.MESSAGE_FOR_PAYER;
      this.model.recipientId = MSG_CONST.MESSAGE_FOR_PAYER;*/
    } else {
      //this.model.recipientName = this.getRecipientName(this.model.sendTo)[0].value;
       recipients = new Recipients(this.sendTo, this.getRecipientName(this.sendTo)[0].value, 
       this.messageFor);
    }
    this.model.recipients.push(recipients);
    //claim attachment       
    this.model.attachment = this.attachment;
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

  setSendToList() {
    this.log.info('---setSendToList Start----');
    // Clear previous selection
    this.sendTo = '';
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
        this.sendToList.push({
          value: user.firstName + (user.middleName ? ' ' + user.middleName + ' ' : ' ') + user.lastName,
          'code': user.EPEnrollmentId
        })
      });
      this.log.info('Send To List' + this.sendToList);
    });
  }
  updateAttachmentInfo(event) {
    this.log.info('updateAttachmentInfo:' + JSON.stringify(event));
    this.attachment = event.attachment;
  }
}
