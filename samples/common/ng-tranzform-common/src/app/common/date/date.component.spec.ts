import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { DateComponent } from './date.component';
import { DateModule } from './date.module';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DateModule,
        TranslateModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should interpret future 2 digit year within max in same century', () => {
    component.currentYear = 2017;
    component.twoDigitYearMaxYearsFromNow = 20;
    expect(component.yearToInt('35')).toEqual(2035);
  });

  it('should interpret future 2 digit year within max in next century', () => {
    component.currentYear = 2090;
    component.twoDigitYearMaxYearsFromNow = 20;
    expect(component.yearToInt('05')).toEqual(2105);
  });

  it('should interpret past 2 digit year in same century', () => {
    component.currentYear = 2017;
    component.twoDigitYearMaxYearsFromNow = 20;
    expect(component.yearToInt('05')).toEqual(2005);
  });

  it('should interpret past 2 digit year in previous century', () => {
    component.currentYear = 2017;
    component.twoDigitYearMaxYearsFromNow = 20;
    expect(component.yearToInt('45')).toEqual(1945);
  });

  it('should parse 4 digit year', () => {
    expect(component.yearToInt('2017')).toEqual(2017);
  });

  it('should parse m/d/yy', () => {
    component.currentYear = 2014;
    const date = component.parseUserInput('2/3/14');
    expect(date.getMonth()).toEqual(1);
    expect(date.getDate()).toEqual(3);
    expect(date.getFullYear()).toEqual(2014);
  });

  it('should parse m-d-yy', () => {
    component.currentYear = 2014;
    const date = component.parseUserInput('2-3-14');
    expect(date.getMonth()).toEqual(1);
    expect(date.getDate()).toEqual(3);
    expect(date.getFullYear()).toEqual(2014);
  });

  it('should parse mm/d/yy', () => {
    component.currentYear = 2014;
    const date = component.parseUserInput('12/3/14');
    expect(date.getMonth()).toEqual(11);
    expect(date.getDate()).toEqual(3);
    expect(date.getFullYear()).toEqual(2014);
  });

  it('should parse m/dd/yy', () => {
    component.currentYear = 2014;
    const date = component.parseUserInput('2/13/14');
    expect(date.getMonth()).toEqual(1);
    expect(date.getDate()).toEqual(13);
    expect(date.getFullYear()).toEqual(2014);
  });

  it('should parse m/d/yyyy', () => {
    component.currentYear = 2014;
    const date = component.parseUserInput('2/3/2014');
    expect(date.getMonth()).toEqual(1);
    expect(date.getDate()).toEqual(3);
    expect(date.getFullYear()).toEqual(2014);
  });

  it('should parse mm/dd/yy', () => {
    component.currentYear = 2014;
    const date = component.parseUserInput('12/13/14');
    expect(date.getMonth()).toEqual(11);
    expect(date.getDate()).toEqual(13);
    expect(date.getFullYear()).toEqual(2014);
  });

  it('should parse mm/dd/yy with zeroes', () => {
    component.currentYear = 2014;
    const date = component.parseUserInput('02/03/14');
    expect(date.getMonth()).toEqual(1);
    expect(date.getDate()).toEqual(3);
    expect(date.getFullYear()).toEqual(2014);
  });

  it('should format default output', () => {
    expect(DateComponent.formatOutput(new Date(2017, 11, 10))).toEqual('12/10/2017');
  });

  it('should format default output with leading zeroes', () => {
    expect(DateComponent.formatOutput(new Date(2017, 4, 3))).toEqual('05/03/2017');
  });

  it('should pass through date for format: date', () => {
    const currentDate = new Date();
    const sameDate = DateComponent.formatOutput(currentDate, 'date');
    expect(sameDate instanceof Date).toBeTruthy();
    expect((<Date>sameDate).getTime()).toEqual(currentDate.getTime(), 'date was changed');
  });

  it('should output date when date is input', () => {
    const currentDate = new Date();
    component.writeValue(currentDate);
    expect(component.format).toEqual('date');
  });
});
