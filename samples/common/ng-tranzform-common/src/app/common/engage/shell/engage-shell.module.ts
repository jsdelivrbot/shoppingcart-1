import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { DirectivesModule } from '../../directives/directives.module';
import { ShellModule } from '../../shell';
import { EngageShellComponent } from './engage-shell.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { SvgService } from '../../shared/svg.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    DirectivesModule,
    ShellModule,
  ],
  exports: [
    EngageShellComponent,
  ],
  declarations: [
    EngageShellComponent,
    LanguageSelectorComponent,
  ],
  providers: [
    SvgService,
  ],
})
export class EngageShellModule {
  constructor (
    svgService: SvgService,
  ) {
  }
}
