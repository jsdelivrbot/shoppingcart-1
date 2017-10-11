import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';

import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { ClaimSearchFormComponent } from './claim-search-form.component';

describe('ClaimSearchFormComponent', () => {
  let component: ClaimSearchFormComponent;
  let fixture: ComponentFixture<ClaimSearchFormComponent>;
  const translation: any = jasmine.createSpyObj('translationService', ['getInstantText']);
   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSearchFormComponent],
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
    fixture = TestBed.createComponent(ClaimSearchFormComponent);
    component = fixture.componentInstance;
    component.searchCriteria = <any> {range: {fromdate: new Date('1/1/1970'), todate: new Date('1/1/1970')}};
    component.configuration = <any>{providerOptions: [], claimstatus: [], dateConfig: [{value: 'some', code: 15}], quickViewTilesProcessed: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('check if update date range is setting values in searchcriteria', () => {
    component.updateDateRange({fromdate: new Date('2/1/1970')});
    expect(component.searchCriteria).toEqual({range: {fromdate: new Date('2/1/1970'), todate: new Date('2/1/1970')}});
    component.updateDateRange({todate: new Date('3/1/1970')});
    expect(component.searchCriteria).toEqual({range: {fromdate: new Date('3/1/1970'), todate: new Date('3/1/1970')}});
  });

  it('check if search removes the undefined properteis', () => {
    spyOn(component.onSearch, 'emit');
    component.searchCriteria = <any> {claimid: '111111', providerid: undefined};
    component.searchClaims();
    expect(component.onSearch.emit).toHaveBeenCalledWith({claimid: '111111'});
  });

  it('check if quick view select sets search criteria', () => {
    spyOn(component.onSearch, 'emit');
    component.selectedQuickView = JSON.stringify({claimid: '111111'});
    component.settingSearchCriteria(component.selectedQuickView);
    expect(component.onSearch.emit).toHaveBeenCalledWith({claimid: '111111'});
  });

  it( 'check if reset makes the object undefined', () => {
    component.resetForm();
    expect(component.predefinedDateRange).toBeUndefined();
    expect(JSON.parse(JSON.stringify(component.searchCriteria))).toEqual({});
  });

  it('provider id should be set to the value passed if the lenght is one', () => {
    component.searchCriteria = undefined;
    component.configuration.providerOptions = [{text: 'somename', value: '1'}];
    component.ngOnInit();
    expect(component.searchCriteria.providerid).toEqual('1');
  });

  it('provider id should be set to the all values if length is greater than 1', () => {
    component.searchCriteria = undefined;
    component.configuration.providerOptions = [{text: 'somename', value: '1'}, {text: 'other', value: '2'}];
    component.ngOnInit();
    expect(component.searchCriteria.providerid).toEqual(['1', '2']);
  });
});
