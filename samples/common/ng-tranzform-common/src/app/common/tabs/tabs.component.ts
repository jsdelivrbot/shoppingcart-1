import { Component, Input, ContentChildren, AfterContentInit, QueryList } from '@angular/core';

import { TabContentDirective } from './tab-content.directive';
import { TabItem } from './tab-item.model';
import { FormFieldsComponent } from '../form-fields/form-fields.component';

/**
 * Content is shown based on which tab is selected.
 *
 * There are 3 modes of operation:
 *
 * Routes
 * Tabs are configured to specify child routes. This allows linking to a tab and adds tab switches to the history stack.
 * Note: Only 1 allowed per page.
 *
 * Auxiliary Routes
 * Tabs are configured to specify auxiliary child routes. Works like routes above but allows multiple per page.
 * Note: This is probably preferred to regular Routes as the URL has better semantic meaning for tabs.
 *
 * Contents
 * Children of this component using the TabContentDirective are hidden until selected. Their state is maintained.
 *
 * @example
 * <!-- Routes -->
 * <tzf-tabs [items]="tabRoutes">
 *   <router-outlet></router-outlet>
 * </tzf-tabs>
 *
 * <!-- Auxiliary Routes -->
 * <tzf-tabs
 *   [items]="tabRoutes"
 *   outlet="auxTabs"
 * >
 *   <router-outlet name="auxTabs"></router-outlet>
 * </tzf-tabs>
 *
 * tabRoutes: TabItem[] = [{
 *   id: 'child1',
 *   label: 'Child 1',
 *   routerPath: 'childRoute1',
 *   svgPath: 'assets/tabOneIcon.svg',
 * }, {
 *   id: 'child2',
 *   label: 'Child 2',
 *   routerPath: 'childRoute2',
 *   svgPath: 'assets/tabTwoIcon.svg',
 * }];
 *
 * @example
 * <tzf-tabs>
 *   <div tzfTabContent id="first" [tabLabel]="First" [tabSvgPath]="assets/tabOneIcon.svg">
 *     This is the content of the first tab.
 *   </div>
 *   <div tzfTabContent id="second" [tabLabel]="Second" [tabSvgPath]="assets/tabTwoIcon.svg">
 *     This is the content of the second tab.
 *   </div>
 * </tzf-tabs>
 */
@Component({
  selector: 'tzf-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  /**
   * Specify tabs that open child routes.
   */
  @Input() items: TabItem[];

  /**
   * An optional outlet to route tab links to. This allows multiple route tabs to be used on one page.
   *
   * The router-outlet tag inside the tzf-tabs element needs its name to match this.
   */
  @Input() outlet: string;

  /**
   * The ID of the selected tab.
   *
   * Note: Not used if items are specified.
   */
  @Input() selected: string;

  /**
   * Child tabs found using the TabContentDirective.
   */
  @ContentChildren(TabContentDirective) tabs: QueryList<TabContentDirective>;

  /**
   * The instance of the selected tab.
   */
  private selectedTab: TabContentDirective;

  /**
   * Routing tabs are being used.
   */
  private routing: boolean;

  /**
   * Initialize child tabs.
   */
  ngAfterContentInit () {
    if (this.tabs.length) {
      if (!this.selected) {
        this.selected = this.tabs.first.id;
      }

      this.initTabs(true);
    } else {
      this.routing = true;

      if (this.outlet) {
        this.items.forEach(item => {
          const outletPath = item.routerPath;
          item.routerPath = {
            outlets: {},
          };

          (<any>item.routerPath.outlets)[this.outlet] = [ outletPath ];
        });
      }
    }
  }

  /**
   * Create TabItems from directives.
   */
  initTabs (initial?: boolean) {
    this.items = [];
    this.tabs.forEach(tab => {
      if (initial) {
        if (tab.id === this.selected) {
          this.selectedTab = tab;
        } else {
          tab.show(false);
        }

        tab.parent = this;
      }

      this.items.push(<any> {
        id: tab.id,
        label: tab.tabLabel,
        badge: tab.tabBadge,
        svgPath: tab.tabSvgPath,
        routerPath: '',
        instance: tab,
        disabled: tab.disabled
      });
    });
  }

  /**
   * Used by non-route tabs to show their content.
   */
  private select (tab: TabContentDirective) {
    this.selected = tab.id;
    this.selectedTab.show(false);
    tab.show();
    this.selectedTab = tab;
  }

  /**
   * Used by non-route tabs to show their content.
   */
  private isDisabled (tab: any) {
    return tab._disabled;
  }

  /**
   * Only show badge if it has a valid value to display.
   * @param value Badge value.
   */
  private showBadge (value: number | string | boolean) {
    return value !== undefined && value !== false && (typeof value === 'number' || (<string>value).length);
  }
}
