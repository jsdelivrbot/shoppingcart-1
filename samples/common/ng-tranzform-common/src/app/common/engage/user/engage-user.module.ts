import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { WebAuthenticationApi } from '@tranzform/client-auth';

import { EngageUserComponent } from './engage-user.component';
import { UserService } from '../../shared/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    EngageUserComponent,
  ],
  declarations: [
    EngageUserComponent,
  ],
  providers: [
    WebAuthenticationApi,
    UserService,
  ],
})
export class EngageUserModule { }
