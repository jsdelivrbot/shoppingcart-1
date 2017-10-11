import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { TranZformCommonModule } from '../../common';

import { FormFieldsExampleComponent } from './form-fields-example.component';
import { FormFieldsNamePipe } from './form-fields-name.pipe';

describe('FormFieldsExampleComponent', () => {
  let component: FormFieldsExampleComponent;
  let fixture: ComponentFixture<FormFieldsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        TranZformCommonModule,
      ],
      declarations: [
        FormFieldsExampleComponent,
        FormFieldsNamePipe,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
