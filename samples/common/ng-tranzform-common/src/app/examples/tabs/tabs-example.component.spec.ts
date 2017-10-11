import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TranZformCommonModule } from '../../common';

import { TabsExampleComponent } from './tabs-example.component';

describe('TabsExampleComponent', () => {
  let component: TabsExampleComponent;
  let fixture: ComponentFixture<TabsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        TranZformCommonModule,
      ],
      declarations: [
        TabsExampleComponent,
      ],
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/',
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
