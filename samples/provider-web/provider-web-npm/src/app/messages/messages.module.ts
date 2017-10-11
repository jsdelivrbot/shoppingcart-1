import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { TabsModule } from '@tranzform/common/tabs';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { MessagesService } from './messages.service';
import { HttpModule } from '@angular/http';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageCenterV2Api } from '@tranzform/client-msgcenter';
import { MasterDataManagementApi } from '@tranzform/client-mdm';
import { DraftsComponent } from './drafts/drafts.component';
import { MessageHeaderComponent } from './message-list/message-header.component';
import { ComposeMailModalComponent } from './compose-mail/compose-mail.component';
import {TranZformCommonModule} from '@tranzform/common';
import { DeleteComponent } from './delete/delete.component';
import { Logger, Options, Level } from 'angular2-logger/core';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { ReplyComponent } from './reply/reply.component';
import { CapitalizePipe } from './pipe/capitalize-pipe.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { MessageFilterComponent } from './message-filter/message-filter.component';
import { ProviderApi } from '@tranzform/client-msprovider';
import { ForwardComponent } from './forward/forward.component';
import { ClaimsPatientSearchComponent } from './claims-patient-search/claims-patient-search.component';
import { ClaimStatusInquiryModule } from './../claimStatusInquiry/claimStatusInquiry.module';

/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MessagesRoutingModule,
    TabsModule,
    InlineSVGModule,
    HttpModule,
    TranZformCommonModule,
    ClaimStatusInquiryModule
  ],
  declarations: [MessagesComponent, InboxComponent, SentComponent, MessageListComponent, 
  DraftsComponent, MessageHeaderComponent, ComposeMailModalComponent, DeleteComponent,
   MessageDetailsComponent, ReplyComponent,MessageHistoryComponent,CapitalizePipe, 
   MessageFilterComponent, ForwardComponent, ClaimsPatientSearchComponent
   

  /** Generator: End of declarations */
  ],
  providers:[MessagesService, MessageCenterV2Api,MasterDataManagementApi,ProviderApi,
   Logger,
    {
      provide: Options,
      useValue: {
        level: Level.LOG,
      }
    }
    ]
 
 /** Generator: Add provider */
})
export class MessagesModule { }
