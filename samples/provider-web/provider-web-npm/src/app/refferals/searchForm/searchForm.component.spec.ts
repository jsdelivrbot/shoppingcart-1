import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { SearchFormComponent } from './searchForm.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  const translation: any = jasmine.createSpyObj('translationService', ['getInstantText']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
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
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      memberfirstname: component.formdata.memberfirstname,
      membermiddlename: component.formdata.membermiddlename,
      memberlastname: component.formdata.memberlastname,
    };
    component.prepareNames();
    expect(component.nameCriteria).toEqual(nameCriteria);
  });
  it('accepting searched name', () => {
    component.formdata = <any>{
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
      memberfirstname: 'ff',
      membermiddlename: 'mm',
      memberlastname: 'll'
    };
    component.acceptNames();
    expect(component.formdata).toEqual(expected);
  });

  it('check if update date range is setting submission date values in searchcriteria', () => {
    component.updateDateRange({submissionstartdate: new Date('2/1/1970')});
    expect(component.formdata).toEqual({submissionstartdate: new Date('2/1/1970'), submissionenddate: new Date('2/1/1970')});
    component.updateDateRange({submissionenddate: new Date('3/1/1970')});
    expect(component.formdata).toEqual({submissionstartdate: new Date('3/1/1970'), submissionenddate: new Date('3/1/1970')});
  });
  it('check if update date range is setting event date values in searchcriteria', () => {
    component.updateDateRange({startdate: new Date('2/1/1970')});
    expect(component.formdata).toEqual({startdate: new Date('2/1/1970'), enddate: new Date('2/1/1970')});
    component.updateDateRange({enddate: new Date('3/1/1970')});
    expect(component.formdata).toEqual({startdate: new Date('3/1/1970'), enddate: new Date('3/1/1970')});
  });
});



