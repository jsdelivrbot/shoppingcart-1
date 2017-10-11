import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutingExampleComponent } from './routing-example.component';
import { RoutingExampleSummaryComponent } from './routing-example-summary/routing-example-summary.component';
import { RoutingExampleDetailComponent } from './routing-example-detail/routing-example-detail.component';

const routes: Routes = [{
  path: '',
  component: RoutingExampleComponent,
  children: [{
    path: ':id',
    component: RoutingExampleSummaryComponent,
    data: {
      title: 'ROUTES.SUMMARY_TITLE',
    },
    children: [{
      path: 'details',
      component: RoutingExampleDetailComponent,
      data: {
        title: 'Details',
      },
    }]
  }]
}];

export const routedComponents = [
  RoutingExampleComponent,
  RoutingExampleSummaryComponent,
  RoutingExampleDetailComponent,
];

export const RoutingExampleRouting: ModuleWithProviders = RouterModule.forChild(routes);
