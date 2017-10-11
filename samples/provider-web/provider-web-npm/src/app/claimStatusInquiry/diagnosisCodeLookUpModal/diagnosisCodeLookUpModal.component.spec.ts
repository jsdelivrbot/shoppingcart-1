import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { DiagnosisCodeLookUpModalComponent } from './diagnosisCodeLookUpModal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ClaimsApi } from '@tranzform/client-msclaims';


describe('DiagnosisCodeLookUpModalComponent', () => {
  let component: DiagnosisCodeLookUpModalComponent;
  let fixture: ComponentFixture<DiagnosisCodeLookUpModalComponent>;
  const claimsApi: any = jasmine.createSpyObj('claimsApi', ['claimsCategoryGet']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisCodeLookUpModalComponent ],
      imports: [RouterTestingModule,SharedModule,
      InlineSVGModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                })
      ],
       providers: [NgbActiveModal,
      { provide: ClaimsApi, useValue: claimsApi}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisCodeLookUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
