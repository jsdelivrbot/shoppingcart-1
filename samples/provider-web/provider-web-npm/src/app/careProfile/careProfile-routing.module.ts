    import { NgModule }             from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { AuthGuard } from './../shared/guards/authguard.service';

    import { CareProfileComponent } from './careProfile/careProfile.component';
    /** Generator: End of imports */

    const careProfileRoutes: Routes = [
        { path: 'careprofile',  component: CareProfileComponent, pathMatch:'full', canActivate: [AuthGuard] }
        /** Generator:End of Routes */
        ];
    @NgModule({
      imports: [
        RouterModule.forChild(careProfileRoutes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class CareProfileRoutingModule { }
