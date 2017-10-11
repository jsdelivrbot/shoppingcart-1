import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from './messages.service';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalEvent } from '@tranzform/common/modal';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { MessageConfigModule as MSG_CONST } from './message-constant';
import { Logger } from 'angular2-logger/core';
import { CapitalizePipe } from './pipe/capitalize-pipe.component';
import { TranslationService } from './../shared/init/translation/translation.service';
import { TabItem } from '@tranzform/common/tabs';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  modalRef: NgbModalRef;
  savedMsg: boolean = false;
  isError: boolean = false;
  draftBadgeValue: number;
  selectedTab = 'inbox';
  selected: string;
  FORWARD_SLASH = '/';
  IMG_PATH = '/assets/icon_';
  IMG_EXT = '.svg';
  tabs: string[] = ['inbox', 'sent', 'drafts', 'deleted'];
  tabItems: TabItem[] = [];

  inboxcount: number;
  showMsg: string;
  message: any;
  msgSubscription: Subscription;
  errorSubscription: Subscription;
  badgeSubscription: Subscription;

  constructor(private messageService: MessagesService,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private modalService: NgbModal,
    private router: Router,
    private log: Logger,
    private translate: TranslationService) {
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
    this.badgeSubscription = this.messageService.getDraftBadge().subscribe(data => {
      let draftTab;
      if (draftTab = this.tabItems.filter(t => t.id === MSG_CONST.TYPE_DRAFTS)[0]) {
        draftTab.badge = data.badgeValue ? data.badgeValue : undefined;
      }
    });
  }

  ngOnInit() {
    // fetch draft count
    this.getDraftItems(MSG_CONST.TYPE_DRAFT, MSG_CONST.MODIFIED_DATE, MSG_CONST.MSG_ORDER_DESC);
  }

  ngOnDestroy() {
    this.badgeSubscription.unsubscribe();
    this.msgSubscription.unsubscribe();
  }

  //invoke  draft service and fetch the count
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
      this.draftBadgeValue = (draftMessages.messages ? draftMessages.messages.length : undefined);
      //build tabs
      this.tabs.forEach(item => {
        const tabItem = {
          id: item,
          routerPath: item,
          svgPath: this.IMG_PATH + item + this.IMG_EXT,
          label: new CapitalizePipe().transform(item),
          badge: (item === MSG_CONST.TYPE_DRAFTS) ? this.draftBadgeValue : undefined,
        };
        this.tabItems.push(tabItem);
      });
    });
  }


  openModal(template) {
    this.modalRef = this.modalService.open(template, <any>{
      size: 'lg', windowClass: 'new-message-modal',
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
    this.modalRef.close();
    this.router.navigate([MSG_CONST.INBOX_ROUTE], {});
    this.log.info('handleBackButtonClicked finished');
  }


  composeMailSave(event) {
    this.log.info('composeMailSave called');
    this.log.info(event.msg);
    this.showMsg = event.msg;
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

    //retrieve the current route
    let currentRoute = this.router.url.substring(this.router.url.lastIndexOf(this.FORWARD_SLASH) + 1);
    this.log.info('currentRoute=>' + currentRoute);
    //if not inbox , need to route to inbox
    if (currentRoute !== MSG_CONST.TYPE_INBOX) {
      this.router.navigate([MSG_CONST.INBOX_ROUTE], {});
    }
    this.log.info('composeMailSave ended');

  }
}
