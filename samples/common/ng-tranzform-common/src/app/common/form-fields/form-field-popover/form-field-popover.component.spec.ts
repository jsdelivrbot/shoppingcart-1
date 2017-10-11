import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldPopoverComponent } from './form-field-popover.component';
import { ClickOutsideDirective } from '../../directives';

describe('FormFieldPopoverComponent', () => {
  let component: FormFieldPopoverComponent;
  let fixture: ComponentFixture<FormFieldPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormFieldPopoverComponent,
        ClickOutsideDirective,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
