import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../components/product/product.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { CartComponent } from '../components/cart/cart.component';
import { NavBarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    CartComponent,
    NavBarComponent,
    ProductComponent,
    ProductDetailComponent,
  ]
})
export class HomeModule { }
