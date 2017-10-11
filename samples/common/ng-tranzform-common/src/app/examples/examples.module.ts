import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Logger, Options, Level } from 'angular2-logger/core';

import { TranZformCommonModule } from '../common';
import { TranZformCommonEngageModule } from '../common/engage';

import { ExamplesComponent } from './examples.component';
import { ClinicalComponent } from './clinical.component';
import { EngageComponent } from './engage.component';
import { AccordionExampleComponent } from './accordion';
import { DropdownExampleComponent } from './dropdown/dropdown-example.component';
import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { FormFieldsNamePipe } from './form-fields/form-fields-name.pipe';
import { TableExampleModule } from './table/table-example.module';
import { RoutingExampleModule } from './routing/routing-example.module';
import { TabsExampleComponent, TabOneExampleComponent, TabTwoExampleComponent } from './tabs';
import { WizardExampleComponent } from './wizard/wizard-example.component';
import { UseComponent } from './use/use.component';
import { AccessCheckComponent} from './access-check/access-check.component';
import {ApplyAccessCheckDirective} from '../common/apply-access-check/apply-access-check.directive';
import { LanguageService } from '../common/engage/shell/language-selector/language.service';

const EXAMPLE_LIST = [
  ExamplesComponent,
  ClinicalComponent,
  EngageComponent,
  AccordionExampleComponent,
  DropdownExampleComponent,
  FormFieldsExampleComponent,
  FormFieldsNamePipe,
  TabsExampleComponent,
  TabOneExampleComponent,
  TabTwoExampleComponent,
  WizardExampleComponent,
  UseComponent,
  AccessCheckComponent,
  ApplyAccessCheckDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableExampleModule,
    RouterModule,
    TranslateModule,
    TranZformCommonModule,
    TranZformCommonEngageModule,
    RoutingExampleModule,
  ],
  declarations: EXAMPLE_LIST,
  exports: EXAMPLE_LIST,
  providers: [
    Logger,
    LanguageService,
    {
      provide: Options,
      useValue: {
        level: Level.LOG,
      },
    },
  ],
})
export class ExamplesModule { }
