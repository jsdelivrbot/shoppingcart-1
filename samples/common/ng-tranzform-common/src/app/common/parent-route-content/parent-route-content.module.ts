import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ParentRouteContentComponent } from './parent-route-content.component';
import { ParentRouteDataService } from './parent-route-data.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ParentRouteContentComponent,
  ],
  declarations: [
    ParentRouteContentComponent,
  ],
})
export class ParentRouteContentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ParentRouteContentModule,
      providers: [
        ParentRouteDataService,
      ]
    };
  }
}
