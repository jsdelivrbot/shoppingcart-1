import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

import { LoadingModule } from '../loading';

import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizard-step/wizard-step.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    TranslateModule,
    LoadingModule,
  ],
  exports: [
    WizardComponent,
    WizardStepComponent,
  ],
  declarations: [
    WizardComponent,
    WizardStepComponent,
  ],
})
export class WizardModule { }
