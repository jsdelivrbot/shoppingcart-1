import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { EngageShellModule } from '.';
import { EngageShellComponent } from './engage-shell.component';
import { LanguageService } from './language-selector/language.service';

describe('EngageShellComponent', () => {
  let component: EngageShellComponent;
  let fixture: ComponentFixture<EngageShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        EngageShellModule,
      ],
      declarations: [
      ],
      providers: [
        LanguageService,
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngageShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
