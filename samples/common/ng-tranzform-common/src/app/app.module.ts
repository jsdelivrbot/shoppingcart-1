import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranZformCommonModule } from './common';
import { ExamplesModule } from './examples/examples.module';
import { BASE_PATH as AUTH_BASE_PATH } from '@tranzform/client-auth';
import { BASE_PATH as AUTHORIZATION_BASE_PATH } from '@tranzform/client-authorization';
import {AccessCheckService} from './common/shared/access-check.service';
import {CanActivateViaAuthGuard} from './guard';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    InlineSVGModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranZformCommonModule.forRoot(),
    ExamplesModule,
  ],
  providers: [{
      provide: AUTH_BASE_PATH,
      useValue: 'https://localhost:7878/tzf/service'
    }, {
      provide: AUTHORIZATION_BASE_PATH,
      useValue: 'https://localhost:7878/tzf/service'
    },
    AccessCheckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
