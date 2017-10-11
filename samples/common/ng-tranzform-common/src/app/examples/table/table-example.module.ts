import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableModule } from 'primeng/components/datatable/datatable';

import { TranZformCommonModule} from '../../common';

import { TableExampleComponent } from './table-example.component';
import { TableExampleRouting, routedComponents } from './table-example.routing';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    TranZformCommonModule,
    TableExampleRouting,
  ],
  exports: [
    routedComponents,
  ],
  declarations: [
    routedComponents,
  ],
})
export class TableExampleModule { }
