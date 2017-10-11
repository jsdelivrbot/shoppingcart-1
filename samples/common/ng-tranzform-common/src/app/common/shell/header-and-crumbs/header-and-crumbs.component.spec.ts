import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { HeaderAndCrumbsComponent } from './header-and-crumbs.component';

describe('HeaderAndCrumbsComponent', () => {
  let component: HeaderAndCrumbsComponent;
  let fixture: ComponentFixture<HeaderAndCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      declarations: [
        HeaderAndCrumbsComponent,
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAndCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
