import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { ClaimStatusInquiryComponent} from './claimStatusInquiry/claimStatusInquiry.component';
import { ClaimSearchComponent} from './claimSearch/claimSearch.component';
import { ClaimSearchResolver } from './claimSearch/claimSearch.resolver';
import { ClaimStatusInquiryRoutingModule, CanDeactivateCreateClaim } from './claimStatusInquiry-routing.module';
import { ClaimSearchResultsComponent } from './claimSearchResults/claimSearchResults.component';
import { ClaimSearchFormComponent } from './claim-search-form/claim-search-form.component';


import { TranZformCommonModule } from '@tranzform/common';
import { ParentRouteContentModule } from '@tranzform/common/parent-route-content/parent-route-content.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClaimsApi} from '@tranzform/client-msclaims';
import {ProfileApi} from '@tranzform/client-profile';
import { InlineSVGModule } from 'ng-inline-svg';
import { ClaimDetailComponent } from './claimDetail/claimDetail.component';
import { DatePipe } from '@angular/common';
import {ClaimFormService } from './claim-form.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap/accordion/accordion.module';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { CreateClaimComponent } from './createClaim/createClaim.component';
import { CreateClaimTabComponent } from './createClaimTab/createClaimTab.component';
import { MemberinformationComponent } from './memberinformation/memberinformation.component';
import { ProviderinformationComponent } from './providerinformation/providerinformation.component';

import { CreateClaimTabsComponent } from './createClaimTabs/createClaimTabs.component';
import { CreateClaimMemberInfoComponent } from './createClaimMemberInfo/createClaimMemberInfo.component';
import { ClaimLineDetailComponent } from './claimLineDetail/claimLineDetail.component';
import { DiagnosisCodeLookUpModalComponent } from './diagnosisCodeLookUpModal/diagnosisCodeLookUpModal.component';
import { CptLookUpModalComponent } from './cptLookUpModal/cptLookUpModal.component';

import {InputMaskModule} from 'primeng/primeng';
import { ServiceDetailComponent } from './serviceDetail/serviceDetail.component';
import { ClaimDetailTabContentComponent } from './claimDetailTabContent/claimDetailTabContent.component';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClaimStatusInquiryRoutingModule,
    TranZformCommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    ParentRouteContentModule,
    NgbAccordionModule.forRoot(),
    DataTableModule,
    InputMaskModule
  ],
  declarations: [ClaimStatusInquiryComponent,ClaimSearchComponent
  ,ClaimSearchResultsComponent, ClaimSearchFormComponent
  ,ClaimDetailComponent, QuickViewComponent
,CreateClaimComponent
,CreateClaimTabComponent
,CreateClaimTabsComponent
,MemberinformationComponent
,ProviderinformationComponent
,CreateClaimMemberInfoComponent
,ClaimLineDetailComponent
,DiagnosisCodeLookUpModalComponent
,CptLookUpModalComponent
,ServiceDetailComponent
,ClaimDetailTabContentComponent
/** Generator: End of declarations */
  ],
  providers: [ClaimsApi, DatePipe, ClaimFormService, ClaimSearchResolver, ProfileApi, CanDeactivateCreateClaim],
  entryComponents: [
    DiagnosisCodeLookUpModalComponent,
    CptLookUpModalComponent
  ],
  exports: [
    ClaimDetailComponent
  ]

 /** Generator: Add provider */
})
export class ClaimStatusInquiryModule { }
