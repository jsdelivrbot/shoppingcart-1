import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { TranZformCommonModule } from '@tranzform/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { QuickViewComponent } from './quick-view.component';

describe('QuickViewComponent', () => {
  let component: QuickViewComponent;
  let fixture: ComponentFixture<QuickViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickViewComponent ],
      imports: [RouterTestingModule, SharedModule, TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                }),
                TranZformCommonModule,
                InlineSVGModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickViewComponent);
    component = fixture.componentInstance;
    component.quickViewData = <any>{
    'qViewCriteria': {
      'providerIds': [],
      'serviceStartDate': 1493546874701,
      'serviceEndDate': 1496138874701,
      'dateRange': 30,
      'claimStatus': 'Pending'
    },
    'qViewCount': 1,
    'totalCount': 4,
    'qViewTitle': 'Last 30 days Pending'
  };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on view details', () => {
    spyOn(component.onDetailsClicked, 'emit' );
    const expected = {claimstatus: ['Pending']
     , providerid: []
     , range: {fromdate: new Date(1493546874701), todate: new Date(1496138874701)}};
    component.viewDetails();
    expect(component.onDetailsClicked.emit).toHaveBeenCalledWith(expected);
  });
});
