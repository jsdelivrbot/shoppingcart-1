import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { PhoneComponent } from './phone.component';
import { PhoneValidatorDirective } from './phone-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
  ],
  exports: [
    PhoneComponent,
    PhoneValidatorDirective,
  ],
  declarations: [
    PhoneComponent,
    PhoneValidatorDirective,
  ],
})
export class PhoneModule { }
