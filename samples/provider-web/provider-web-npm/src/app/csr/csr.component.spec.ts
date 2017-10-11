import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSRComponent } from './csr.component';

describe('CSRComponent', () => {
  let component: CSRComponent;
  let fixture: ComponentFixture<CSRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
