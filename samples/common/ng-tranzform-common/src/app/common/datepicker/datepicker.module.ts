import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbDatepickerModule, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

import { DatepickerComponent } from './datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule.forRoot(),
  ],
  exports: [
    DatepickerComponent,
  ],
  declarations: [
    DatepickerComponent,
  ]
})
export class DatepickerModule {
  constructor (
    ngbDatepickerConfig: NgbDatepickerConfig
  ) {
    ngbDatepickerConfig.minDate = { year: (new Date().getFullYear() - 125), month: 1, day: 1 };
    ngbDatepickerConfig.maxDate = { year: (new Date().getFullYear() + 100), month: 12, day: 31 };
  }
}
