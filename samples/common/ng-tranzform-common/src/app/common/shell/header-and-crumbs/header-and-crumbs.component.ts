import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tzf-header-and-crumbs',
  templateUrl: './header-and-crumbs.component.html',
  styleUrls: ['./header-and-crumbs.component.scss']
})
export class HeaderAndCrumbsComponent {
  @Input() simpleCrumb: boolean;

  private appTitle = document.title;
  routeTitle: string;

  singleCrumb: any;
  private singleCrumbParams: any;
  crumbs: any[];
  private crumbParams: any[];
  private titleParams: any;

  /**
   * Update page title, header, and breadcrumbs when route is activated.
   */
  constructor(router: Router,
              private translate: TranslateService,
  ) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        // Wait a tick for ParentRouteContentComponent to set dynamic data
        setTimeout(() => {
          let crumbs = this.crumbs = [];
          const crumbParams = this.crumbParams = [];
          let path: string[] = [];
          let dataFromParent: any;

          this.routeTitle = undefined;

          // Traverse to current route from root
          let route = router.routerState.snapshot.root;
          let data;
          while (route.firstChild) {
            route = route.firstChild;
            data = route.data;

            if (!data.title) {
              dataFromParent = data._childData;
              continue;
            }

            if (route.url.length) {
              path = [...path, route.url[0].path];
            } else {
              dataFromParent = data._childData;
              continue;
            }

            // If route has a title, add a breadcrumb for it
            if (data.title) {
              this.routeTitle = data.title;
              this.titleParams = dataFromParent;

              crumbs.push({
                path,
                // Skip location change unless it is explicitly asked for
                skipLocationChange: !(data.skipLocationChange === false),
                text: data.title,
              });
              crumbParams.push(dataFromParent);
            }

            dataFromParent = data._childData;
          }

          if (crumbs.length === 1) {
            this.crumbs = [];
          }

          // If crumbs are defined in route, override automatic ones
          if (data && data.crumbs) {
            this.crumbs = data.crumbs;
          }

          crumbs = this.crumbs;
          if (this.simpleCrumb && crumbs.length) {
            // data.crumbs may contain single crumb so handle that
            const singleCrumbIndex = Math.max(0, crumbs.length  - 2);
            this.singleCrumb = crumbs[singleCrumbIndex];
            this.singleCrumbParams = crumbParams[singleCrumbIndex];
          } else {
            this.singleCrumb = undefined;
          }

          // Set the document title to the deepest title found
          if (this.routeTitle) {
            this.translate.get(this.routeTitle, this.titleParams).subscribe(translated => {
              document.title = this.appTitle + ' - ' + translated;
            });
          } else {
            document.title = this.appTitle;
          }
        });
      });
  }
}
