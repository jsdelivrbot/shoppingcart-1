import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

import { ShellComponent } from './shell.component';
import { ShellService } from './shell.service';
import { DirectivesModule } from '../directives/directives.module';
import { HeaderAndCrumbsComponent } from './header-and-crumbs/header-and-crumbs.component';
import { SvgService } from '../shared/svg.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    TranslateModule,
    RouterModule,
    DirectivesModule,
  ],
  exports: [
    ShellComponent,
    HeaderAndCrumbsComponent,
  ],
  declarations: [
    ShellComponent,
    HeaderAndCrumbsComponent,
  ],
  providers: [
    SvgService
  ],
})
export class ShellModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShellModule,
      providers: [
        ShellService,
      ]
    };
  }

  constructor (
    svgService: SvgService,
  ) {
  }
}
