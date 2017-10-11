import { NgModule } from '@angular/core';

import { EngageShellModule } from './shell';
import { EngageUserModule } from './user';

@NgModule({
  imports: [
    EngageShellModule,
    EngageUserModule,
  ],
  exports: [
    EngageShellModule,
    EngageUserModule,
  ],
})
export class TranZformCommonEngageModule { }
