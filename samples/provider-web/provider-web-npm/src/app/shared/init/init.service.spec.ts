import { TestBed, inject } from '@angular/core/testing';
import { InitService } from './init.service';
import { TranslationService } from './../init/translation/translation.service';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalService } from './global/global.service';

describe('InitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitService, TranslationService,GlobalService],
            imports: [RouterTestingModule, HttpModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                })
            ]
    });
  });

  it('should ...', inject([InitService], (service: InitService) => {
    expect(service).toBeTruthy();
  }));
});
