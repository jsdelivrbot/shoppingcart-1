import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as mdmClient from '@tranzform/client-mdm/index';
import { MessageConfigModule as MSG_CONST } from '../message-constant';
import { Logger } from 'angular2-logger/core';
import { MessagesService } from './../messages.service';
import * as msgcenterClient from '@tranzform/client-msgcenter/index';
@Component({
  selector: 'app-message-filter',
  templateUrl: './message-filter.component.html',
  styleUrls: ['./message-filter.component.scss']
})
export class MessageFilterComponent implements OnInit {
  @Input() type;
  @Output() onApplyFilter = new EventEmitter();


  private messageType = MSG_CONST;
  private categories: any = [];
  private  messageStatuses: any = [];
  private category: string;
  private messageStatus: string;
  private disableReset: boolean = true;
  private disableApply: boolean = true;

  constructor(private mdmApi: mdmClient.MasterDataManagementApi,
    private msgCenterApi: msgcenterClient.MessageCenterV2Api,
    private log: Logger,
    private messageService: MessagesService) { }
  ngOnInit() {
    this.getCategories(MSG_CONST.MESSAGE_CATEGORY_TYPE);
    this.getMessageStatus(MSG_CONST.MESSAGE_STATUS_TYPE);
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
      this.log.info('categories -> ' + this.categories);
    });
  }

  // categories list based on category
  getMessageStatus(category: string) {
    const param: any = {
      'category': category
    };
    // TODO once environment is up will remove
    this.mdmApi.getCategories(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.messageStatuses = data;
      if(this.messageStatuses && this.messageStatuses[0].data) {
        this.messageStatus = this.messageStatuses[0].data[0].code;
      }
      this.log.info(' messageStatuses -> ' + this.messageStatuses);
    });
  }

  /* Resetting the selected filter to default values */
  resetFilter() {
    this.category = '';
    this.messageStatus = this.messageStatuses[0].data[0].code;
    this.disableReset = true;
    this.disableApply = true;
  }

/* Applying filter on selected category and status */
  applyFilter() {
    this.messageService.setFilterOptions(this.category,this.messageStatus );
    const param: any = {
      'type': this.type,
      'sortby': MSG_CONST.MODIFIED_DATE,
      'orderby': MSG_CONST.MSG_ORDER_DESC,
      'conversationcategory': this.category,
      'readindicator': this.messageStatus
    };
    this.msgCenterApi.getConversationMessagesV2(param, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((data: any) => {
      this.onApplyFilter.emit({ 'data': data, 'messageStatus': this.messageStatus });
      this.disableApply = true;
    });
  }

/* Method called when any category or status is changed */
  changeFilter(){
    this.disableReset = false;
    this.disableApply = false;
  }
}
