import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { CareProfileComponent } from './careProfile/careProfile.component';
import { CareProfileRoutingModule } from './careProfile-routing.module';

/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CareProfileRoutingModule
  ],
  declarations: [CareProfileComponent
  /** Generator: End of declarations */
  ]
 
 /** Generator: Add provider */
})
export class CareProfileModule { }
