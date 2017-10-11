import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CSRComponent } from './csr.component';
import { AuthGuard } from './../shared/guards/authguard.service';

/** Generator: End of imports */

const csrDashboardRoutes: Routes = [
  {
  }];
@NgModule({
  imports: [
    RouterModule.forChild(csrDashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CSRDashboardRoutingModule { }
