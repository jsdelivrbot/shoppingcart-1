import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { DropdownExampleComponent } from './dropdown-example.component';
import { TranZformCommonModule } from '../../common';

describe('DropdownExampleComponent', () => {
  let component: DropdownExampleComponent;
  let fixture: ComponentFixture<DropdownExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
        TranZformCommonModule
      ],
      declarations: [ DropdownExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
