import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { RefferalsComponent } from './refferals/refferals.component';
import { RefferalsRoutingModule } from './refferals-routing.module';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ReferralDecisionSupportComponent } from './referralDecisionSupport/referralDecisionSupport.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { SearchFormComponent } from './searchForm/searchForm.component';
import { SearchFormResolver } from './search/search-form.resolver';
import { AuthorizationsAndReferralsApi } from '@tranzform/client-ms-authreferral';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ReferralDetailComponent } from './referral-detail/referral-detail.component';
import { MemberInfoComponent } from './member-info/member-info.component';
import { MemberInfoDetailComponent } from './member-info-detail/member-info-detail.component';
import { RequestingProviderTabComponent } from './requestingProviderTab/requestingProviderTab.component';
import { ServiceProviderTabComponent } from './serviceProviderTab/serviceProviderTab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RefferalsRoutingModule,
    TranZformCommonModule,
    InlineSVGModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RefferalsComponent
  ,SearchComponent
,CreateComponent
,ReferralDecisionSupportComponent
,SearchFormComponent, ReferralDetailComponent
,RequestingProviderTabComponent
,ServiceProviderTabComponent,
MemberInfoComponent, MemberInfoDetailComponent
/** Generator: End of declarations */
  ],
  providers: [SearchFormResolver, AuthorizationsAndReferralsApi]

 /** Generator: Add provider */
})
export class RefferalsModule { }
