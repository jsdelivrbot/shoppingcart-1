import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsrHeaderComponent } from './csr-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CsrHeaderComponent,
  ],
  declarations: [
    CsrHeaderComponent,
  ],
})
export class CsrModule { }
