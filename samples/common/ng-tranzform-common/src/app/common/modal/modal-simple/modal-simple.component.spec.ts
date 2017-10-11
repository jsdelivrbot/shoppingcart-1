import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TranslateModule } from '@ngx-translate/core';

import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ModalSimpleComponent } from './modal-simple.component';

describe('ModalSimpleComponent', () => {
  let component: ModalSimpleComponent;
  let fixture: ComponentFixture<ModalSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [
        ModalSimpleComponent,
        ModalContentComponent,
      ],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: {},
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
