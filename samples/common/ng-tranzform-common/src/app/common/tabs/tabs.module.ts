import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

import { TabsComponent } from './tabs.component';
import { TabContentDirective } from './tab-content.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InlineSVGModule,
    TranslateModule.forChild(),
  ],
  exports: [
    TabsComponent,
    TabContentDirective,
  ],
  declarations: [
    TabsComponent,
    TabContentDirective,
  ],
})
export class TabsModule { }
