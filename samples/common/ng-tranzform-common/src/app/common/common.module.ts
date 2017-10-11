import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap/accordion/accordion.module';
import { TranslateService } from '@ngx-translate/core';

import * as shared from './shared';
import { DECLARATIONS } from './modules';
import { ModalModule } from './modal';
import { ParentRouteContentModule } from './parent-route-content';
import { ShellModule } from './shell';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbAccordionModule.forRoot(),
    ModalModule.forRoot(),
    ParentRouteContentModule.forRoot(),
    ShellModule.forRoot(),
    ...DECLARATIONS
  ],
  declarations: [],
  exports: [
    NgbAccordionModule,
    ModalModule,
    ParentRouteContentModule,
    ShellModule,
    ...DECLARATIONS
  ]
})
export class TranZformCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TranZformCommonModule,
      providers: [
        shared.AuthHeaderService,
        shared.UserService,
        {
          provide: TranslateService,
          useClass: shared.TzfTranslateService,
        }, {
          provide: Http,
          useFactory: shared.HttpServiceFactory,
          deps: [XHRBackend, RequestOptions]
        },
      ]
    };
  }
}
