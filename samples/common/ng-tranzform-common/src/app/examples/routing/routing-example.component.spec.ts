import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ParentRouteContentModule } from '../../common/parent-route-content/parent-route-content.module';

import { RoutingExampleComponent } from './routing-example.component';

describe('RoutingExampleComponent', () => {
  let component: RoutingExampleComponent;
  let fixture: ComponentFixture<RoutingExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule.forRoot([]),
        ParentRouteContentModule.forRoot(),
      ],
      declarations: [
        RoutingExampleComponent,
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {},
      }, {
        provide: Router,
        useValue: {
          events: Observable.of({}),
          isActive: () => {},
        },
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
