import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanDeactivate } from '@angular/router';
import { AuthGuard } from './../shared/guards/authguard.service';
import { RefferalsComponent } from './refferals/refferals.component';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ReferralDecisionSupportComponent } from './referralDecisionSupport/referralDecisionSupport.component';
import { SearchFormComponent } from './searchForm/searchForm.component';
import { ReferralDetailComponent } from './referral-detail/referral-detail.component';
import { SearchFormResolver } from './search/search-form.resolver';
import { RequestingProviderTabComponent } from './requestingProviderTab/requestingProviderTab.component';
import { ServiceProviderTabComponent } from './serviceProviderTab/serviceProviderTab.component';
/** Generator: End of imports */

const refferalsRoutes: Routes = [
  {
    path: 'referrals',
    data: {
      title: 'Referrals & Authorizations'
    },
    component: RefferalsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/referrals/search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        data: {
          title: 'Referrals & Authorizations'
        },
        component: SearchComponent,
        resolve: { referralDataList: SearchFormResolver },
        children: [{
          path: 'detail/:referenceId',
          component: ReferralDetailComponent,
          pathMatch: 'full',
          data: { title: 'Referral Response Detail' }
        }]
      }, {
        path: 'create',
        data: {
          title: 'Referrals & Authorizations'
        },
        component: CreateComponent
      }, {
        path: 'support',
        component: ReferralDecisionSupportComponent,
      }
    ]
  }
/** Generator:End of Routes */
];
@NgModule({
  imports: [
    RouterModule.forChild(refferalsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RefferalsRoutingModule { }
