import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { CareFeedComponent } from './careFeed.component';

describe('CareFeedComponent', () => {
  let component: CareFeedComponent;
  let fixture: ComponentFixture<CareFeedComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareFeedComponent ],
      imports: [RouterTestingModule,SharedModule,TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: TranslateLoaderFactory,
                        deps: [Http]
                    }
                })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
