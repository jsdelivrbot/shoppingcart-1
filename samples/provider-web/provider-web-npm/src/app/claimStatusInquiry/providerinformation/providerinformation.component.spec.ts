import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderinformationComponent } from './providerinformation.component';

describe('ProviderinformationComponent', () => {
  let component: ProviderinformationComponent;
  let fixture: ComponentFixture<ProviderinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
