import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../shared/guards/authguard.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
/** Generator: End of imports */

const unauthorizedRoutes: Routes = [
  {
    path: '',
    redirectTo: '/unauthorized',
    pathMatch: 'full'
  },{
      path: 'unauthorized',
      component: UnauthorizedComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(unauthorizedRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UnauthorizedRoutingModule { }
