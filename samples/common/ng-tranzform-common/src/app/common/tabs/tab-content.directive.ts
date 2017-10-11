import { Directive, AfterViewInit, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

import { TabsComponent } from './tabs.component';

/**
 * Configuration for content tabs.
 */
@Directive({
  selector: '[tzfTabContent]',
})
export class TabContentDirective implements AfterViewInit, OnChanges {


  /**
   * ID of the tab content.
   */
  @Input() id: string;

  /**
   * The label to show in the tab.
   */
  @Input() tabLabel: string;

  /**
   * Additional text to show next to the label.
   */
  @Input() tabBadge: string | number;

  /**
   * Path to the SVG icon to show in the tab.
   */
  @Input() tabSvgPath: string;

   /**
   * Disable tab
   */
  @Input() disabled: boolean;

  private _parent: TabsComponent;

  /**
   * Save the reference to the element this directive is attached to.
   */
  constructor(
    private _element: ElementRef,
  ) {
  }

  set parent (tabs: TabsComponent) {
    this._parent = tabs;
  }

  ngOnChanges (changes: SimpleChanges) {
    if (this._parent) {
      this._parent.initTabs();
    }
  }

  ngAfterViewInit () {
    const el = this._element.nativeElement;

    el.setAttribute('role', 'tabpanel');
    if (this.id) {
      el.setAttribute('aria-labelledby', this.id + '-tab');
    }
  }

  /**
   * Specify if the content of this tab should be shown.
   */
  show (show = true) {
    this._element.nativeElement.style.display = show ? '' : 'none';
  }
}
