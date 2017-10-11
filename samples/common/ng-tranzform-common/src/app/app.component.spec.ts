import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranZformCommonModule } from './common';
import { ExamplesModule } from './examples/examples.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        ExamplesModule,
        TranslateModule.forRoot(),
        TranZformCommonModule.forRoot(),
      ],
      declarations: [
        AppComponent,
      ],
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
