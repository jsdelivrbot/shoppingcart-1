import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrHeaderComponent } from './csr-header.component';

describe('CsrHeaderComponent', () => {
  let component: CsrHeaderComponent;
  let fixture: ComponentFixture<CsrHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
