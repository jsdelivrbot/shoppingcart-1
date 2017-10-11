    import { NgModule }             from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { AuthGuard } from './../shared/guards/authguard.service';

    import { ProviderDashboardComponent } from './dashboard/provider-dashboard.component';
    /** Generator: End of imports */

    const dashboardRoutes: Routes = [
      { path:"dashboard",component: ProviderDashboardComponent,canActivate: [AuthGuard], data: {
        title: 'Dashboard',
        crumbs: [{
          path: 'dashboard',
          text: 'Dashboard',
        }, {
          text: 'First',
        }],
      },pathMatch:'full'}];
    @NgModule({
      imports: [
        RouterModule.forChild(dashboardRoutes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class DashboardRoutingModule { }
