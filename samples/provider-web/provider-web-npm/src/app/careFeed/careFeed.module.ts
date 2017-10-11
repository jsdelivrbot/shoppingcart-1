import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { CareFeedComponent } from './careFeed/careFeed.component';
import { CareFeedRoutingModule } from './careFeed-routing.module';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CareFeedRoutingModule
  ],
  declarations: [CareFeedComponent
  /** Generator: End of declarations */
  ]
 
 /** Generator: Add provider */
})
export class CareFeedModule { }
