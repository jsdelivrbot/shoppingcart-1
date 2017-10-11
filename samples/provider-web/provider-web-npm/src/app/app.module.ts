import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,XHRBackend, Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppSettings } from './app-settings';
import { SharedModule } from './shared/shared.module';
import { FormFieldsNamePipe } from './shared/pipes/membername/form-fields-name.pipe';
import { ClaimStatusInquiryModule } from './claimStatusInquiry/claimStatusInquiry.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CSRDashboardModule } from './csr/csr.module';
import { CareProfileModule } from './careProfile/careProfile.module';
import { PatientListModule } from './patientList/patientList.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { RefferalsModule } from './refferals/refferals.module';
import { MessagesModule } from './messages/messages.module';
import { CareFeedModule } from './careFeed/careFeed.module';
import { ClientModule } from './client/client.module';
import { UnauthorizedModule } from './unauthorized/unauthorized.module';
import { AppRoutingModule } from './app-routing.module';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, Location } from '@angular/common';
import { getBaseLocation } from './shared/common-functions.util';
import { InlineSVGModule } from 'ng-inline-svg';
import { environment } from './../environments/environment';
import { ShellService } from '@tranzform/common/shell/shell.service';
import { AppStorageService } from './app-storage.service';
import { AppService } from './app.service';
import { httpFactory } from './csr.http.factory';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json')
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,

        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),

    InlineSVGModule.forRoot({ baseUrl: AppSettings.UI_BASE_PATH }),
    DashboardModule,
    CSRDashboardModule,
    HomeModule,

    NoopAnimationsModule,
    ClaimStatusInquiryModule,
    CareProfileModule,
    PatientListModule,
    EligibilityModule,
    RefferalsModule,
    MessagesModule,
    CareFeedModule,
    ClientModule,
    AppRoutingModule,
    UnauthorizedModule/** Generator: End of Imports */

  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    AppSettings,
   ShellService,
    AppStorageService,
    AppService,
     {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        }
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }
