import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableModule } from 'primeng/components/datatable/datatable';

import { ResponsiveColumnsComponent } from './responsive-columns/responsive-columns.component';
import { ResponsiveTableDirective } from './responsive-table.directive';
import { ResponsiveColumnDirective } from './responsive-column.directive';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
  ],
  exports: [
    ResponsiveColumnsComponent,
    ResponsiveTableDirective,
    ResponsiveColumnDirective,
  ],
  declarations: [
    ResponsiveColumnsComponent,
    ResponsiveTableDirective,
    ResponsiveColumnDirective,
  ]
})
export class TableModule { }
