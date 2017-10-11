import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslationService, TranslateLoaderFactory } from './translation.service';

describe('TranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationService],
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

  it('should ...', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
  }));
});
