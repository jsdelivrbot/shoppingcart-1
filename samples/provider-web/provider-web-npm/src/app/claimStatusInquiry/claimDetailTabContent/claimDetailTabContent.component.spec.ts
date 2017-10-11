import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../../shared/shared.module';
import { ClaimDetailTabContentComponent } from './claimDetailTabContent.component';

describe('ClaimDetailTabContentComponent', () => {
  let component: ClaimDetailTabContentComponent;
  let fixture: ComponentFixture<ClaimDetailTabContentComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimDetailTabContentComponent ],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimDetailTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
