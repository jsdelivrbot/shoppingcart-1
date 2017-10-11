import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { RefferalsComponent } from './refferals.component';

describe('RefferalsComponent', () => {
  let component: RefferalsComponent;
  let fixture: ComponentFixture<RefferalsComponent>;
  const translation: any = jasmine.createSpyObj('translationService', ['getInstantText']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferalsComponent ],
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
      ],
      providers: [{ provide: TranslationService, useValue: translation }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
