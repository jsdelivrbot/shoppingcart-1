import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../shared/guards/authguard.service';
import { MessagesComponent } from './messages.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { DraftsComponent } from './drafts/drafts.component';
import { DeleteComponent } from './delete/delete.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
/** Generator: End of imports */
const messagesRoutes: Routes = [
  {
    path: 'messages',
    data: { title: 'Messages' },
    component: MessagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/messages/inbox',
        pathMatch: 'full',
      },
      {
        path: 'inbox',
        component: InboxComponent,
      }, {
        path: 'sent',
        component: SentComponent,
      }, {
        path: 'drafts',
        component: DraftsComponent,
      }, {
        path: 'deleted',
        component: DeleteComponent,
      }
    ]
  },
  {
    path: 'message/details',
    data: { title: ' ' },
    component: MessageDetailsComponent,
    canActivate: [AuthGuard]
  }
  /** Generator:End of Routes */
];
@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessagesRoutingModule { }
