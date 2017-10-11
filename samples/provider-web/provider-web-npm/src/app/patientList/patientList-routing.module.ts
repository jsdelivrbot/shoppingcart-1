    import { NgModule }             from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { AuthGuard } from './../shared/guards/authguard.service';

    import { PatientListComponent } from './patientList/patientList.component';
    /** Generator: End of imports */

    const patientListRoutes: Routes = [
        {
          path: 'patientlist',
          component: PatientListComponent,
          pathMatch:'full',
          canActivate: [AuthGuard]
        }
        /** Generator:End of Routes */
        ];
    @NgModule({
      imports: [
        RouterModule.forChild(patientListRoutes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class PatientListRoutingModule { }
