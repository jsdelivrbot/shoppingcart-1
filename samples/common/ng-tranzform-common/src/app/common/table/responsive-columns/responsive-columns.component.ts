import { Component, Input } from '@angular/core';

import { Column } from 'primeng/components/common/shared';
import { DataTable } from 'primeng/components/datatable/datatable';

/**
 * Display columns that didn't fit in the table.
 *
 * @example
 * <ng-template pTemplate="rowexpansion" let-row>
 *   <tzf-responsive-columns
 *     [row]="row"
 *     [columns]="columns"
 *   ></tzf-responsive-columns>
 * </ng-template>
 */
@Component({
  selector: 'tzf-responsive-columns',
  templateUrl: './responsive-columns.component.html',
  styleUrls: ['./responsive-columns.component.scss']
})
export class ResponsiveColumnsComponent {
  /**
   * The row data.
   */
  @Input() row: any;

  /**
   * The data table's column definitions from (responsiveColumns).
   */
  @Input() columns: Column[];

  /**
   * Support hierarchical column fields (field="person.firstName")
   */
  private resolveFieldData = DataTable.prototype.resolveFieldData;
}
