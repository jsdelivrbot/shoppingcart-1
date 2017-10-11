import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { ParentRouteDataService } from './parent-route-data.service';

/**
 * Use this component to wrap the content of a component that has child routes. It can provide a router-outlet
 * for the child routes and hide content when the child is navigated to. You can also bind data to it to be
 * used in the title and breadcrumb of the child.
 *
 * @example
 * <tzf-parent-route-content
 *   [childData]="childData"
 * >
 *   All content for a parent component goes here.
 * </tzf-parent-route-content>
 *
 * @example
 * <tzf-parent-route-content
 *   [childData]="childData"
 *   [sticky]="1"
 * >
 *   All content for a parent component goes here. This content will still be displayed when the child is active because sticky == 1.
 * </tzf-parent-route-content>
 *
 * @example
 * // my-route.component.ts
 * childData: any = {};
 *
 * viewRowDetail (rowSelected) {
 *   childData.name = rowSelected.name;
 *   // skipLocationChange is used to prevent the browser Back button from navigating to a detail component whose data went out of scope
 *   this.route.navigate(['myRoute', rowSelected.id], { skipLocationChange: true });
 * }
 *
 * @example
 * // Route configuration
 * const routes: Routes = [{
 *   path: 'myRoute',
 *   component: MyRouteComponent,
 *   data: {
 *     title: 'MY_ROUTE.TITLE',
 *   },
 *   children: [{
 *     path: ':id',
 *     component: MyRouteDetailComponent,
 *     data: {
 *      title: 'MY_ROUTE.DETAIL_TITLE',
 *     },
 *   }
 * }];
 *
 * @example
 * {
 *   "MY_ROUTE": {
 *     "TITLE": "My Route",
 *     "DETAIL_TITLE": "Details for {{ name }}"
 *   }
 * }
 */
@Component({
  selector: 'tzf-parent-route-content',
  templateUrl: './parent-route-content.component.html',
})
export class ParentRouteContentComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Data can be bound here for the child to receive. It can also be referenced in the resource value for the child's route title.
   */
  @Input() toChild;

  /**
   * Content can be made sticky to be shown when child routes are active.
   *
   * true: Always show this content.
   * <number>: The depth to which to show this content. (1) Show when a child is active, (2) Show when a child or grandchild is active, etc.
   */
  @Input() sticky: boolean | number;

  /**
   * Add a router outlet after the content.
   * Default true but can be set to false, for instance if you have two <tzf-route-parent-content> components on one page.
   */
  @Input() routerOutlet = true;

  /**
   * Add an ID if you need to pass data to or from here.
   */
  @Input() id: string;

  /**
   * Receive data from the child component.
   */
  @Output() fromChild = new EventEmitter<any>();

  private sendToChild: Observer<any>;

  /**
   * Show the content.
   */
  show = true;

  constructor (
    // My route is the route containing this instance
    private myRoute: ActivatedRoute,
    private router: Router,
    private umbilical: ParentRouteDataService,
  ) {
    router.events
      .filter(e => e instanceof NavigationEnd)

      // Continue the chain with my route instead of NavigationEnd event
      .map(() => myRoute)

      // Find the parent of the deepest child
      .map(route => {
        let parent;
        for (; route.firstChild; route = route.firstChild) {
          parent = route;
        }
        return parent;
      })

      .subscribe((parentOfCurrentRoute: ActivatedRoute) => {
        if (parentOfCurrentRoute === myRoute) {
          // Copy the data bound to this to the child's route data
          if (this.toChild) {
            parentOfCurrentRoute.firstChild.snapshot.data._fromParent = this.toChild;
          };

          // My route's child is active so we should be shown for any truthy value of sticky
          this.show = !!this.sticky;
        } else if (!parentOfCurrentRoute || this.sticky === true) {
          // My route is active or I'm completely sticky so should be shown no matter what
          this.show = true;
        } else {
          if (this.sticky > 0) {
            // My route's grandchild or deeper is active so find how deep it is from me
            const routes = parentOfCurrentRoute.snapshot.pathFromRoot;

            // Starting at current route's parent so already 1 deep
            let depth = 1;

            // Move through ancestors
            for (let i = routes.length - 1; i > 0; i--) {
              // Check if this is my route
              if (routes[i] === myRoute.snapshot) {
                // Show content if sticky enough
                if (this.sticky >= depth) {
                  this.show = true;
                  return;
                }

                break;
              }

              depth++;
            }
          }

          this.show = false;
        }
      });
  }

  ngOnInit () {
    if (this.id) {
      const observables = this.umbilical.registerParent(this.id);

      // Save this for sending data to the child
      this.sendToChild = observables.toChild;

      // Listen for data from child
      observables.fromChild
        .subscribe(data => {
          // Send data to parent.
          this.fromChild.emit(data);
        });
    }
  }

  ngOnDestroy () {
    if (this.id) {
      this.umbilical.unregisterParent(this.id);
    }
  }

  /**
   * Detect changes to childData and send to child.
   * @param changes Changes to data bindings.
   */
  ngOnChanges (changes: SimpleChanges) {
    if (this.sendToChild && changes.toChild) {
      this.sendToChild.next(this.toChild);
      this.myRoute.snapshot.data._childData = this.toChild;
    }
  }
}
