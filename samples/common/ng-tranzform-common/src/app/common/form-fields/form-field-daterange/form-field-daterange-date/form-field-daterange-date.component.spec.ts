import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldsModule } from '../../';
import { DatepickerModule } from '../../../datepicker';
import { FormFieldDaterangeDateComponent } from './form-field-daterange-date.component';

describe('FormFieldDaterangeDateComponent', () => {
  let component: FormFieldDaterangeDateComponent;
  let fixture: ComponentFixture<FormFieldDaterangeDateComponent>;

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
    fixture = TestBed.createComponent(FormFieldDaterangeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight correct dates on start datepicker', () => {
    component.startDate = true;
    component.pickerDate = { month: 3, day: 10, year: 2017 };
    component.maxDate = '03/20/2017';
    component.ngOnChanges(<any>{ maxDate: true });

    expect(component.inRange({ month: 3, day: 9, year: 2017 })).toBeFalsy('earlier than selected date should not be highlighted');
    expect(component.inRange({ month: 3, day: 10, year: 2017 })).toBeFalsy('selected date should not be highlighted');
    expect(component.inRange({ month: 3, day: 15, year: 2017 })).toBeTruthy('included date should be highlighted');
    expect(component.inRange({ month: 3, day: 20, year: 2017 })).toBeTruthy('max date should be highlighted');
    expect(component.inRange({ month: 3, day: 21, year: 2017 })).toBeFalsy('later than max date should not be highlighted');
  });

  it('should highlight correct dates on start datepicker when there is a min date', () => {
    component.startDate = true;
    component.pickerDate = { month: 3, day: 10, year: 2017 };
    component.minDate = '03/01/2017';
    component.maxDate = '03/20/2017';
    component.ngOnChanges(<any>{ minDate: true, maxDate: true });

    expect(component.inRange({ month: 3, day: 9, year: 2017 })).toBeFalsy('earlier than selected date should not be highlighted');
    expect(component.inRange({ month: 3, day: 10, year: 2017 })).toBeFalsy('selected date should not be highlighted');
    expect(component.inRange({ month: 3, day: 15, year: 2017 })).toBeTruthy('included date should be highlighted');
    expect(component.inRange({ month: 3, day: 20, year: 2017 })).toBeTruthy('max date should be highlighted');
    expect(component.inRange({ month: 3, day: 21, year: 2017 })).toBeFalsy('later than max date should not be highlighted');
  });

  it('should highlight correct dates on end datepicker', () => {
    component.pickerDate = { month: 3, day: 20, year: 2017 };
    component.minDate = '03/10/2017';
    component.ngOnChanges(<any>{ minDate: true });

    expect(component.inRange({ month: 3, day: 9, year: 2017 })).toBeFalsy('earlier than min date should not be highlighted');
    expect(component.inRange({ month: 3, day: 10, year: 2017 })).toBeTruthy('min date should be highlighted');
    expect(component.inRange({ month: 3, day: 15, year: 2017 })).toBeTruthy('included date should be highlighted');
    expect(component.inRange({ month: 3, day: 20, year: 2017 })).toBeFalsy('selected date should not be highlighted');
    expect(component.inRange({ month: 3, day: 21, year: 2017 })).toBeFalsy('later than selected date should not be highlighted');
  });

  it('should highlight correct dates on end datepicker when there is a max date', () => {
    component.pickerDate = { month: 3, day: 20, year: 2017 };
    component.minDate = '03/10/2017';
    component.maxDate = '03/31/2017';
    component.ngOnChanges(<any>{ minDate: true, maxDate: true });

    expect(component.inRange({ month: 3, day: 9, year: 2017 })).toBeFalsy('earlier than min date should not be highlighted');
    expect(component.inRange({ month: 3, day: 10, year: 2017 })).toBeTruthy('min date should be highlighted');
    expect(component.inRange({ month: 3, day: 15, year: 2017 })).toBeTruthy('included date should be highlighted');
    expect(component.inRange({ month: 3, day: 20, year: 2017 })).toBeFalsy('selected date should not be highlighted');
    expect(component.inRange({ month: 3, day: 21, year: 2017 })).toBeFalsy('later than selected date should not be highlighted');
  });
});
