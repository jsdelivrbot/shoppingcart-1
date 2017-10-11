import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

import { InputButtonComponent } from './input-button.component';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    TranslateModule.forChild(),
  ],
  exports: [
    InputButtonComponent,
  ],
  declarations: [
    InputButtonComponent,
  ],
})
export class InputButtonModule { }
