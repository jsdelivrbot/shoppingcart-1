import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './init/translation/translation.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/authguard.service';
import { InitService } from './init/init.service';
import { AuthService } from './authenticate/auth.service';
import { TranslationService } from './init/translation/translation.service';
import { GlobalService } from './init/global/global.service';
import { MaterialModule } from '@angular/material';
import { I18pluralPipe } from './pipes/i18plural/i18plural.pipe';
import { MinDateValidatorDirective } from './validators/minDateValidator.directive';
import { MaxDateValidatorDirective } from './validators/maxDateValidator.directive';
import { DateRangeValidator } from './validators/date-validator.directive';
import { DateMinMaxValidator } from './validators/dateMinMax-Validator.directive';
import { DatePropertiesTransformPipe } from './pipes/date-transform.pipe';
import { FormFieldsNamePipe } from './pipes/membername/form-fields-name.pipe';
import { TranZformCommonModule } from '@tranzform/common';
import { YearToAgePipe } from './pipes/year-to-age/year-to-age.pipe';
import { ValidateOnBlurDirective } from './directives/validate-on-blur.directive';
import { ProgressTabComponent } from './components/progressTab/progressTab.component';
import { ProgressTabsComponent } from './components/progressTabs/progressTabs.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppSettings } from '../app-settings';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
    FormsModule,
    MaterialModule,
    TranZformCommonModule.forRoot(),
    InlineSVGModule.forRoot({ baseUrl: AppSettings.UI_BASE_PATH })
  ],
  exports: [
    TranslateModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    I18pluralPipe,
    MinDateValidatorDirective,
    FormFieldsNamePipe,
    MinDateValidatorDirective,
    MaxDateValidatorDirective,
    DateRangeValidator,
    DateMinMaxValidator,
    DatePropertiesTransformPipe,
    TranZformCommonModule,
    YearToAgePipe,
    ValidateOnBlurDirective,
    ProgressTabComponent,
    ProgressTabsComponent
  ],
  declarations: [I18pluralPipe, MinDateValidatorDirective, MaxDateValidatorDirective,
  DateRangeValidator, DateMinMaxValidator, DatePropertiesTransformPipe, FormFieldsNamePipe, YearToAgePipe, ValidateOnBlurDirective,
  ProgressTabComponent, ProgressTabsComponent],
  providers: [
    GlobalService,
    TranslationService,
    InitService,
    AuthService,
    DatePropertiesTransformPipe
  ],
})
export class SharedModule {

  constructor() {}
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [AuthGuard, InitService, AuthService, TranslationService, GlobalService]
    }
  }

}
