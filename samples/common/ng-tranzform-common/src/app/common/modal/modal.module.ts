import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalSimpleComponent } from './modal-simple/modal-simple.component';
import { ModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    NgbModalModule.forRoot(),
    TranslateModule,
  ],
  exports: [
    ModalContentComponent,
  ],
  declarations: [
    ModalContentComponent,
    ModalSimpleComponent,
  ],
  entryComponents: [
    ModalSimpleComponent,
  ]
})
export class ModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [
        ModalService,
      ],
    };
  }
}
