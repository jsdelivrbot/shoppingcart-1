import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { EligibilitySearchFormComponent } from './eligibility-search-form.component';
import { FormFieldsNamePipe } from './form-fields-name.pipe';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';

describe('EligibilitySearchFormComponent', () => {
  let component: EligibilitySearchFormComponent;
  let fixture: ComponentFixture<EligibilitySearchFormComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilitySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search eligibility setting the right paramters', () => {
    component.onSearch = jasmine.createSpyObj('onSearch', ['emit']);
    component.searchEligibility();
    expect(component.onSearch.emit).toHaveBeenCalledWith(component.searchCriteria);
    expect(component.searchEligibilityForm.pristine).toBeTruthy();
  });
  it('resetting the search form', () => {
    component.resetForm();
    expect(JSON.parse(JSON.stringify(component.searchCriteria))).toEqual({});
    expect(component.searchEligibilityForm.pristine).toBeTruthy();
  });
  it('resetting searched name', () => {
    const nameCriteria = {
      memberfirstname: '',
      membermiddlename: '',
      memberlastname: '',
    };
    component.resetNames();
    expect(component.nameCriteria).toEqual(nameCriteria);
  });
  it('preparing searched name', () => {
    const nameCriteria = {
      memberfirstname: component.searchCriteria.memberfirstname,
      membermiddlename: component.searchCriteria.membermiddlename,
      memberlastname: component.searchCriteria.memberlastname,
    };
    component.prepareNames();
    expect(component.nameCriteria).toEqual(nameCriteria);
  });
  it('accepting searched name', () => {
    component.searchCriteria = <any>{
      tenantenrollmentid: '1',
      memberfirstname: 'f',
      membermiddlename: 'm',
      memberlastname: 'l'
    };
    component.nameCriteria = {
      memberfirstname: 'ff',
      membermiddlename: 'mm',
      memberlastname: 'll'
    };
    const expected = {
      tenantenrollmentid: '1',
      memberfirstname: 'ff',
      membermiddlename: 'mm',
      memberlastname: 'll'
    };
    component.acceptNames();
    expect(component.searchCriteria).toEqual(expected);
  });
});
