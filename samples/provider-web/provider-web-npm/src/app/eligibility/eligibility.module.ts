import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranZformCommonModule } from '@tranzform/common';
import { SharedModule } from './../shared/shared.module';
import { EligibilityComponent } from './eligibility/eligibility.component';
import { EligibilityRoutingModule } from './eligibility-routing.module';
import { EligibilitySearchFormComponent } from './eligibility-search-form/eligibility-search-form.component';

import { FormFieldsNamePipe } from './eligibility-search-form/form-fields-name.pipe';
import { InlineSVGModule } from 'ng-inline-svg';
import { EligibilityResultsComponent } from './eligibilityResults/eligibilityResults.component';
import { EligibilityApi } from '@tranzform/client-eligibility/api/EligibilityApi';
import { EligibilityOverviewComponent } from './eligibility-overview/eligibility-overview.component';
import { Logger, Options, Level } from 'angular2-logger/core';
import { EligibilityDataServiceService } from './eligibility-data-service.service';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import {EligibilityProfileInformationComponent} from './eligibility-profile-information/eligibility-profile-information.component';
import { MessageComponent } from './message/message.component';
import { CurrencyPipe } from '@angular/common';
import { EligibilityRowDataResolverPipe } from './eligibilityResults/eligibility-row-data-resolver.pipe';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EligibilityRoutingModule,
    TranZformCommonModule,
    InlineSVGModule,
    DataTableModule
  ],
  declarations: [
    EligibilityComponent,
  EligibilitySearchFormComponent,
  FormFieldsNamePipe,
  EligibilityResultsComponent,
  EligibilityOverviewComponent,
  EligibilityProfileInformationComponent,
  MessageComponent,
  EligibilityRowDataResolverPipe
/** Generator: End of declarations */
  ],
 providers: [EligibilityApi,
 Logger,
    {
      provide: Options,
      useValue: {
        level: Level.LOG,
      }
    },
    EligibilityDataServiceService,
    CurrencyPipe],
 /** Generator: Add provider */
})
export class EligibilityModule { }
