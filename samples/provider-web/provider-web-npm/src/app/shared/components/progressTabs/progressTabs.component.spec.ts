import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared.module';
import { ProgressTabsComponent } from './progressTabs.component';

describe('ProgressTabsComponent', () => {
  let component: ProgressTabsComponent;
  let fixture: ComponentFixture<ProgressTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressTabsComponent ],
      imports: [RouterTestingModule, SharedModule, TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
