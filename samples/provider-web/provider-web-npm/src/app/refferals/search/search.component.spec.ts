import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http, URLSearchParams } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { SearchComponent } from './search.component';
import { SearchFormComponent } from './../searchForm/searchForm.component';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
/* providers */
import { DatePropertiesTransformPipe } from './../../shared/pipes/date-transform.pipe';
import { AuthorizationsAndReferralsApi} from '@tranzform/client-ms-authreferral';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const dateTransformPipe = jasmine.createSpyObj('datetrans', ['transform']);
  const api = jasmine.createSpyObj('api', ['authnreferralsSearchGet']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, SearchFormComponent ],
      imports: [
      RouterTestingModule,
      SharedModule,
      TranZformCommonModule,
      InlineSVGModule,
      DataTableModule,
      TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                })
      ],
      providers: [
        {provide: DatePropertiesTransformPipe, useValue: dateTransformPipe},
        {provide: AuthorizationsAndReferralsApi, useValue: api}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check if pagenumber is added by default to the query parameters', () => {
    api.authnreferralsSearchGet.and.returnValue(new Observable(observer => {
      observer.next({authAndReferralSummary: [], totalRecordCount: 0});
    }));
    component.searchAuthReferral({});
    expect(api.authnreferralsSearchGet).toHaveBeenCalledWith({ pagenumber: 1 });
  });

  it('check if pagenumber is added to the query parameters if passed', () => {
    api.authnreferralsSearchGet.and.returnValue(new Observable(observer => {
      observer.next({authAndReferralSummary: [], totalRecordCount: 0});
    }));
    component.searchAuthReferral({}, { pagenumber: 2 });
    expect(api.authnreferralsSearchGet).toHaveBeenCalledWith({ pagenumber: 2 });
  });

  xit('download Pdf or Excel file', () => {
      spyOn(window, 'open');
      const fileType = 'pdf';
      const params = new URLSearchParams();
      component.criteria = {submissionstartdate: '07/19/2017', submissionenddate: '07/19/2017'};
      component.downloadFile(fileType);
      expect(window.open).toHaveBeenCalledWith(
        'http://127.0.0.1:3000/pdf/msauthreferral/authnreferrals/search?submissionstartdate=07/19/2017&submissionenddate=07/19/2017');

  });

  it('onSubmit inner function call', () => {
      spyOn(component, 'searchAuthReferral');
      component.criteria = {submissionstartdate: '07/19/2017', submissionenddate: '07/19/2017'};
      component.onSubmit(component.criteria);
      expect(component.searchAuthReferral).toHaveBeenCalledWith(component.criteria);
  });

});
