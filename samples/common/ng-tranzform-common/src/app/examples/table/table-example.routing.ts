import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableExampleComponent } from './table-example.component';

const routes: Routes = [{
  path: '',
  component: TableExampleComponent,
}];

export const routedComponents = [
  TableExampleComponent,
];

export const TableExampleRouting: ModuleWithProviders = RouterModule.forChild(routes);
