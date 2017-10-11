import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared.module';
import { ProgressTabComponent } from './progressTab.component';

describe('ProgressTabComponent', () => {
  let component: ProgressTabComponent;
  let fixture: ComponentFixture<ProgressTabComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressTabComponent ],
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
    fixture = TestBed.createComponent(ProgressTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
