import { NgModule } from '@angular/core';

import { NgbPaginationConfig, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap/pagination/pagination.module';

import { PaginationComponent } from './pagination.component';
import { PaginationConfig } from './pagination-config';

@NgModule({
  imports: [
    NgbPaginationModule,
  ],
  exports: [
    PaginationComponent,
  ],
  declarations: [
    PaginationComponent,
  ],
  providers: [{
    provide: NgbPaginationConfig,
    useClass: PaginationConfig,
  }],
})
export class PaginationModule { }
