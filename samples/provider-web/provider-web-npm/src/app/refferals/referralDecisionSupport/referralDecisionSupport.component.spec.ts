import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { ReferralDecisionSupportComponent } from './referralDecisionSupport.component';

describe('ReferralDecisionSupportComponent', () => {
  let component: ReferralDecisionSupportComponent;
  let fixture: ComponentFixture<ReferralDecisionSupportComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralDecisionSupportComponent ],
      imports: [RouterTestingModule,SharedModule,TranslateModule.forRoot({
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
    fixture = TestBed.createComponent(ReferralDecisionSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
