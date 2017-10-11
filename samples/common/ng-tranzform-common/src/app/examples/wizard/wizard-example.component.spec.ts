import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { WizardExampleComponent } from './wizard-example.component';
import { ExamplesModule } from '../examples.module';

describe('WizardExampleComponent', () => {
  let component: WizardExampleComponent;
  let fixture: ComponentFixture<WizardExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        ExamplesModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
