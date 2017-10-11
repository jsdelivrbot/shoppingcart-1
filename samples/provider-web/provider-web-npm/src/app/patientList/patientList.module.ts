import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { PatientListComponent } from './patientList/patientList.component';
import { PatientListRoutingModule } from './patientList-routing.module';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PatientListRoutingModule
  ],
  declarations: [PatientListComponent
  /** Generator: End of declarations */
  ]
 
 /** Generator: Add provider */
})
export class PatientListModule { }
