import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    TranslateModule.forChild(),
  ],
  exports: [
    MessageComponent,
  ],
  declarations: [
    MessageComponent
  ],
})
export class MessageModule { }
