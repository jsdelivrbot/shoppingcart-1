import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatepickerModule } from '../datepicker';
import { InputButtonModule } from '../input-button';
import { DateComponent } from './date.component';

import { DirectivesModule } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    DatepickerModule,
    InputButtonModule,
  ],
  exports: [
    DateComponent
  ],
  declarations: [
    DateComponent,
  ],
})
export class DateModule { }
