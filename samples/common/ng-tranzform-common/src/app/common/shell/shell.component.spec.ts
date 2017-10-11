import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,  } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGDirective } from 'ng-inline-svg';

import { ShellModule } from '.';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        ShellModule.forRoot(),
      ],
      declarations: [
      ],
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/',
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
