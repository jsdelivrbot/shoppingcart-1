    import { NgModule }             from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { AuthGuard } from './../shared/guards/authguard.service';

    import { CareFeedComponent } from './careFeed/careFeed.component';
    /** Generator: End of imports */

    const careFeedRoutes: Routes = [
        { path: 'carefeed',  component: CareFeedComponent, pathMatch:'full', canActivate: [AuthGuard] }
        /** Generator:End of Routes */
        ];
    @NgModule({
      imports: [
        RouterModule.forChild(careFeedRoutes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class CareFeedRoutingModule { }
