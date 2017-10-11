import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { EligibilityComponent } from './eligibility.component';
import { EligibilitySearchFormComponent } from './../eligibility-search-form/eligibility-search-form.component';
import { FormFieldsNamePipe } from './../eligibility-search-form/form-fields-name.pipe';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { Observable } from 'rxjs/Rx';
import { EligibilityApi } from '@tranzform/client-eligibility/api/EligibilityApi';
import { Logger } from 'angular2-logger/core';
import { EligibilityDataServiceService } from './../eligibility-data-service.service';
import { DatePipe } from '@angular/common';

describe('EligibilityComponent', () => {
  let component: EligibilityComponent;
  let fixture: ComponentFixture<EligibilityComponent>;
  const eligibilityApi: any  = jasmine.createSpyObj('eligibilityApi', ['eligibilityGet']);
  const logger: any = jasmine.createSpyObj('logger', ['error']);
  const eligibilityService: any = {};
  const datepipe: any  = jasmine.createSpyObj('datepipe', ['transform']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EligibilityComponent,
        EligibilitySearchFormComponent,
        FormFieldsNamePipe],
      imports: [
        RouterTestingModule,
        SharedModule,
        InlineSVGModule,
        TranZformCommonModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [Http]
          }
        })
      ],
      providers: [{ provide: EligibilityApi, useValue: eligibilityApi }
      , {provide: Logger, useValue: logger}
      , {provide: EligibilityDataServiceService, useValue: eligibilityService}
      , {provide: DatePipe, useValue: datepipe}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should route to results', inject([Router], (router: Router) => {
    eligibilityApi.eligibilityGet.and.returnValue(new Observable(observer => {
      observer.next('response');
    }));
    const spy = spyOn(router, 'navigate');
    const req = {
      tenantenrollmentid: '1',
      memberfirstname: 'm',
      memberlastname: 'l',
      dateofbirth: '',
      servicefromdate: 's',
      servicetodate: 's'
    };
    component.onEligibilitySearch(req);
    expect(component.eligibilityResult).toBe('response');
    const url = spy.calls.first().args[0];
    expect(JSON.stringify(url)).toBe(JSON.stringify(['eligibility', 'results']));
  }));

  it('results should be undefined and not routed', () => {
    eligibilityApi.eligibilityGet.and.returnValue(new Observable(observer => {
      observer.error(new Error('some error'));
    }));
    const req = {
      tenantenrollmentid: '1',
      memberfirstname: 'm',
      memberlastname: 'l',
      dateofbirth: '',
      servicefromdate: 's',
      servicetodate: 's'
    };
    component.onEligibilitySearch(req);
    expect(component.eligibilityResult).toBeUndefined();
  });

});
