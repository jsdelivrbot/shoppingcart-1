import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { CptLookUpModalComponent } from './cptLookUpModal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ClaimsApi } from '@tranzform/client-msclaims';


describe('CptLookUpModalComponent', () => {
  let component: CptLookUpModalComponent;
  let fixture: ComponentFixture<CptLookUpModalComponent>;
  const claimsApi: any = jasmine.createSpyObj('claimsApi', ['claimsCategoryGet']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CptLookUpModalComponent ],
      imports: [RouterTestingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      InlineSVGModule,
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
    fixture = TestBed.createComponent(CptLookUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
