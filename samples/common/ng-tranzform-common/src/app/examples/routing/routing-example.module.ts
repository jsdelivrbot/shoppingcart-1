import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ParentRouteContentModule } from '../../common/parent-route-content/parent-route-content.module';

import { RoutingExampleComponent } from './routing-example.component';
import { RoutingExampleRouting, routedComponents } from './routing-example.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ParentRouteContentModule,
    RoutingExampleRouting,
  ],
  exports: [
    routedComponents,
  ],
  declarations: [
    routedComponents,
  ],
})
export class RoutingExampleModule { }
