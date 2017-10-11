import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ProviderDashboardComponent } from './dashboard/provider-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
        
  ],
  declarations: [DashboardComponent,
  ProviderDashboardComponent
  /** Generator: End of declarations */
  ], 
  exports: [
    DashboardComponent ,
    ProviderDashboardComponent   
  ]
 
 /** Generator: Add provider */
})
export class DashboardModule { }
