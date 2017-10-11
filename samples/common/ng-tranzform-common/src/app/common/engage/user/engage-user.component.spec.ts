import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TranslateModule } from '@ngx-translate/core';

import { EngageUserModule } from './engage-user.module';
import { EngageUserComponent } from './engage-user.component';

describe('EngageUserComponent', () => {
  let component: EngageUserComponent;
  let fixture: ComponentFixture<EngageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        TranslateModule.forRoot(),
        EngageUserModule,
      ],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
