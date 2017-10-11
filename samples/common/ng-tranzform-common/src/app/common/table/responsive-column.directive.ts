import { Directive, Input } from '@angular/core';

/**
 * Configure a data table column to be responsive.
 */
@Directive({
  selector: 'p-column[responsiveWidth]' // tslint:disable-line:directive-selector
})
export class ResponsiveColumnDirective {
  /**
   * The width in pixels to use when calculating how many columns are visible.
   *
   * This does NOT set a width or guarantee this column will have this width.
   */
  @Input() responsiveWidth: number;
}
