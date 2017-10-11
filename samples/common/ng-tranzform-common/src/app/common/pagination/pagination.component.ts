import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { NgbPagination } from '@ng-bootstrap/ng-bootstrap/pagination/pagination.module';

/**
 * A pagination bar.
 *
 * @example
 * <tzf-pagination
 *   [collectionSize]="results.length"
 *   [pageSize]="5"
 *   [(page)]="page"
 *   (pageChange)="onPageChange()"
 * >
 * </tzf-pagination>
 */
@Component({
  selector: 'tzf-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  /**
   * Total number of items.
   */
  @Input() collectionSize: number;

  /**
   * Number of items per page.
   *
   * Default: 10
   */
  @Input() pageSize: number;

  /**
   * Page to display.
   */
  @Input() page = 1;

  /**
   * The page was changed. The event contains the new page number.
   */
  @Output() pageChange = new EventEmitter<number>(true);

  /**
   * The ng-bootstrap pagination component doing the heavy lifting.
   */
  @ViewChild(NgbPagination) ngb: NgbPagination;
}
