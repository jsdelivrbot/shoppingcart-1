    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { AuthGuard } from './../shared/guards/authguard.service';
    import { EligibilityComponent } from './eligibility/eligibility.component';
    import { EligibilityResultsComponent } from './eligibilityResults/eligibilityResults.component';
/** Generator: End of imports */
    const eligibilityRoutes: Routes = [{
      path: 'eligibility',
      data: {
      title: 'Eligibility'
    },
    component: EligibilityComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'results',
        data: {
          title: 'Eligibility Results'
        },
        component: EligibilityResultsComponent
      }
    ]}
/** Generator:End of Routes */
        ];
    @NgModule({
      imports: [
        RouterModule.forChild(eligibilityRoutes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class EligibilityRoutingModule { }
