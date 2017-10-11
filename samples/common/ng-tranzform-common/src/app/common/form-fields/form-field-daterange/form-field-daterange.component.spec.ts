import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

import { DatepickerModule } from '../../datepicker';
import { FormFieldsModule } from '../form-fields.module';
import { FormFieldDaterangeComponent } from './form-field-daterange.component';

describe('FormFieldDaterangeComponent', () => {
  let component: FormFieldDaterangeComponent;
  let fixture: ComponentFixture<FormFieldDaterangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        InlineSVGModule,
        TranslateModule.forRoot(),
        DatepickerModule,
        FormFieldsModule,
      ],
      declarations: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldDaterangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
