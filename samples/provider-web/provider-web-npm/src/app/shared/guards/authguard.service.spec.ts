import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './authguard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ReflectiveInjector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http } from '@angular/http';
import { InitService } from './../init/init.service';
import { TranslationService } from './../init/translation/translation.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../init/translation/translation.service';

let allSet2: Observable<Boolean> = new Observable(observer => { observer.next(false); });


describe('AuthGuard', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard, InitService, TranslationService, { provide: InitService, useClass: MockInitService }],
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

    it('AuthGuard should work if initial services have been called successfully',
        async(inject([AuthGuard, Router, InitService, TranslationService, Http], (auth, router, initService, translationService, http) => {
            spyOn(router, 'navigate');
            expect(auth.canActivate()).toBeTruthy();
        })
        ));

    it('AuthGuard should not allow access if initial service calls have failed',
        async(inject([AuthGuard, Router, InitService, TranslationService, Http], (auth, router, initService, translationService, http) => {

            spyOn(initService, 'isAllSet').and.returnValue(allSet2);
            spyOn(router, 'navigate');
            expect(auth.canActivate()).toBeTruthy();
        })
        ));
});

class MockInitService {
    allSet: Observable<Boolean> = new Observable(observer => { observer.next(true); observer.complete(); });
    isAllSet() {
        return this.allSet;
    }


}