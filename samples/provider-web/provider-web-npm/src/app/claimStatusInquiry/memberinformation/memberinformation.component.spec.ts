import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberinformationComponent } from './memberinformation.component';

describe('MemberinformationComponent', () => {
  let component: MemberinformationComponent;
  let fixture: ComponentFixture<MemberinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
