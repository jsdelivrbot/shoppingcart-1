import { NgModule } from '@angular/core';
import { CSRDashboardModule } from '../csr/csr.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CSRDashboardModule,
    DashboardModule,
    HomeRoutingModule,
    CommonModule,
    BrowserModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
