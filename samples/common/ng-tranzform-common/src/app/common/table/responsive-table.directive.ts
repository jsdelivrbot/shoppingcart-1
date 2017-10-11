import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';

import { Column } from 'primeng/components/common/shared';

import { ResponsiveColumnsComponent } from './responsive-columns/responsive-columns.component';
import { ResponsiveColumnDirective } from './responsive-column.directive';

/**
 * Provide responsive functionality for data tables where columns will be moved
 * to the expandable area when there isn't enough room to fit them all.
 *
 * @example
 * <p-dataTable
 *   [value]="data"
 *   [expandableRows]="true"
 *   (responsiveColumns)="columns = $event"
 *   [responsiveExpander]="true"
 * >
 *   <p-column expander="true" styleClass="expander"></p-column>
 *   <p-column field="field1" header="Field 1" [responsiveMinWidth]="50"></p-column>
 *   ... more columns ...
 *   <ng-template pTemplate="rowexpansion" let-row>
 *     <tzf-responsive-columns
 *       [row]="row"
 *       [columns]="columns"
 *     ></tzf-responsive-columns>
 *     ... additional expandable content if desired ...
 *   </ng-template>
 * </p-dataTable>
 */
@Directive({
  selector: 'p-dataTable[responsiveColumns]' // tslint:disable-line:directive-selector
})
export class ResponsiveTableDirective implements AfterViewInit {
  /**
   * Only show the expander column when one or more columns is displayed there. Set to true if there is no other expandable content.
   */
  @HostBinding('class.responsiveExpander')
  @Input() responsiveExpander: boolean;

  /**
   * Provide the responsive columns to be bound to tzf-responsive-columns.
   */
  @Output() responsiveColumns = new EventEmitter<Column[]>();

  /**
   * All of the data table columns.
   */
  @ContentChildren(Column) columnQuery: QueryList<Column>;

  /**
   * All of the columns with a minimum width set. This should include all columns except the expander.
   */
  @ContentChildren(ResponsiveColumnDirective) responsiveColumnQuery: QueryList<ResponsiveColumnDirective>;

  /**
   * The number of columns that should be visible. The others will be hidden by styles based on this value.
   */
  @HostBinding('attr.visibleColumns')
  private visibleColumns: number;

  /**
   * Column widths defined by the ResponsiveColumnDirective.
   */
  private columnWidths: number[];

  constructor (
    private elRef: ElementRef,
  ) {
  }

  /**
   * Emit columns, save the column widths, and find the columns that should be visible right away.
   */
  ngAfterViewInit () {
    this.responsiveColumns.emit(this.columnQuery.toArray().splice(1));
    this.columnWidths = this.responsiveColumnQuery.map(column => column.responsiveWidth);
    this.updateVisible();
  }

  /**
   * Calculate how many columns can be shown while maintaining minimum column widths.
   */
  @HostListener('window:resize')
  private updateVisible () {
    const colWidths = this.columnWidths;

    let tableWidth = this.elRef.nativeElement.getBoundingClientRect().width - 60; // 60 for expander
    let visibleColumns: number;

    for (let i = 0; i < colWidths.length; i++) {
      tableWidth -= colWidths[i];
      if (tableWidth < 0) {
        visibleColumns = i;
        break;
      }
    }

    this.visibleColumns = visibleColumns;
  }
}
