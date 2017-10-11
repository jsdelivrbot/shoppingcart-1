import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './../shared/guards/authguard.service';

import { ClaimStatusInquiryComponent } from './claimStatusInquiry/claimStatusInquiry.component';
import { ClaimSearchComponent } from './claimSearch/claimSearch.component';
import { ClaimSearchResultsComponent } from './claimSearchResults/claimSearchResults.component';
import { ClaimDetailComponent } from './claimDetail/claimDetail.component';
import { ClaimSearchResolver } from './claimSearch/claimSearch.resolver';
import { CreateClaimComponent } from './createClaim/createClaim.component';
import { CreateClaimTabComponent } from './createClaimTab/createClaimTab.component';
import { CreateClaimTabsComponent } from './createClaimTabs/createClaimTabs.component';
import { CreateClaimMemberInfoComponent } from './createClaimMemberInfo/createClaimMemberInfo.component';
import { DiagnosisCodeLookUpModalComponent } from './diagnosisCodeLookUpModal/diagnosisCodeLookUpModal.component';
import { CptLookUpModalComponent } from './cptLookUpModal/cptLookUpModal.component';
import { Observable } from 'rxjs/Rx';
import { ModalEvent, ModalService } from '@tranzform/common/modal';
import { ClaimDetailTabContentComponent } from './claimDetailTabContent/claimDetailTabContent.component';
/** Generator: End of imports */
@Injectable()
export class CanDeactivateCreateClaim implements CanDeactivate<CreateClaimComponent> {
  constructor(private tzfModalService: ModalService) {}
  canDeactivate(
    component: CreateClaimComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.selectedMember) {
      const prom = this.tzfModalService.confirm({
        headerText: 'Please Confirm',
        message: [
          'You will lose all information related to the current claim'
        ],
        cancelText: 'Cancel',
        okText: 'Ok',
      });

      const observable = Observable.create(observer => {
        prom.then(
          ((obsSh) => {
            return () => {
              obsSh.next(true);
            };
          })(observer),
          ((obsSh) => {
            return () => {
              obsSh.next(false);
            };
          })(observer)
        )
      })

      return observable;
    }
    return true;
  }
}

export const claimStatusInquiryRoutes: Routes = [
  {
    path: 'claimstatusinquiry',
    data: {
          title: 'Claims'
    },
    component: ClaimStatusInquiryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/claimstatusinquiry/search',
        pathMatch: 'full',
      }, {
        path: 'search',
        data: {
          title: 'Claim Search'
        },
        component: ClaimSearchComponent,
        resolve: { configData: ClaimSearchResolver },
        children: [
          {
        path: 'results',
        data: {
          title: 'Search Results'
        },
        component: ClaimSearchResultsComponent,
        children: [{
          path: 'detail',
          data: {
            title: 'ROUTES.CLAIMDETAIL'
          },
          component: ClaimDetailComponent
        }]
      }
    ]},
    {
        path: 'create',
        data: {
          title: 'Create Claims'
        },
        component: CreateClaimComponent,
        canDeactivate: [CanDeactivateCreateClaim]
      }]
  }];
@NgModule({
  imports: [
    RouterModule.forChild(claimStatusInquiryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClaimStatusInquiryRoutingModule { }
