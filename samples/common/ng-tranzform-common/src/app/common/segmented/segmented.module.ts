import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { SegmentedComponent } from './segmented.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  exports: [
    SegmentedComponent,
  ],
  declarations: [
    SegmentedComponent,
  ],
})
export class SegmentedModule { }
