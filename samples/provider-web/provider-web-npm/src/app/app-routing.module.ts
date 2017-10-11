import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/authguard.service';
import { environment } from './../environments/environment';
const appRoutes: Routes = [
  {
    path: environment.baseUrl,
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
