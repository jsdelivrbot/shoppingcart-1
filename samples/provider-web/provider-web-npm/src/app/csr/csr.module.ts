import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { CSRDashboardRoutingModule } from './csr-routing.module';
import { CSRSearchComponent } from './search/csr-search.component';
import { CSRComponent } from './csr.component';
import {TranZformCommonModule} from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { RouterModule } from '@angular/router';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InlineSVGModule,
    HttpModule,
    TranZformCommonModule,
    DataTableModule,
    RouterModule
  ],
  declarations: [
    CSRComponent,
    CSRSearchComponent
  /** Generator: End of declarations */
  ],
  exports: [
    CSRComponent,
    CSRSearchComponent
  ]
 
 /** Generator: Add provider */
})
export class CSRDashboardModule { }
