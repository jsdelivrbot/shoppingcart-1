import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UnauthorizedRoutingModule
  ],
  declarations: [UnauthorizedComponent
  /** Generator: End of declarations */
  ]
 
 /** Generator: Add provider */
})
export class UnauthorizedModule { }
