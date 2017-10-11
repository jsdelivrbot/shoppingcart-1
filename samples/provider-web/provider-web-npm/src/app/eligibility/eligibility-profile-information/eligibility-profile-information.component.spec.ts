import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { EligibilityProfileInformationComponent } from './eligibility-profile-information.component';

describe('EligibilityProfileInformationComponent', () => {
  let component: EligibilityProfileInformationComponent;
  let fixture: ComponentFixture<EligibilityProfileInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligibilityProfileInformationComponent ],
      imports: [
        RouterTestingModule,
        SharedModule,
        TranZformCommonModule,
        InlineSVGModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [Http]
          }
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityProfileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
