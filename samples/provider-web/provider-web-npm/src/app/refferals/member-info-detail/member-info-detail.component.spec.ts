import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInfoDetailComponent } from './member-info-detail.component';

describe('MemberInfoDetailComponent', () => {
  let component: MemberInfoDetailComponent;
  let fixture: ComponentFixture<MemberInfoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberInfoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
