import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateLoaderFactory } from './../../shared/init/translation/translation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { SharedModule } from './../shared/shared.module';
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  /*let fixture: ComponentFixture<MessagesComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
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
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
