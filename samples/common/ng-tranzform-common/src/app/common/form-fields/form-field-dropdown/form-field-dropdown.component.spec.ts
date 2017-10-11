import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { TranZformCommonModule } from '../../common.module';

import { FormFieldDropdownComponent } from './form-field-dropdown.component';

describe('FormFieldDropdownComponent', () => {
  let component: FormFieldDropdownComponent;
  let fixture: ComponentFixture<FormFieldDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        TranZformCommonModule,
      ],
      declarations: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
