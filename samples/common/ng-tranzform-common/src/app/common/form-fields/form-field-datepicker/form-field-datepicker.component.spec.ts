import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FormFieldsModule } from '../index';
import { FormFieldDatepickerComponent } from './form-field-datepicker.component';

describe('FormFieldDatepickerComponent', () => {
  let component: FormFieldDatepickerComponent;
  let fixture: ComponentFixture<FormFieldDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        FormFieldsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
