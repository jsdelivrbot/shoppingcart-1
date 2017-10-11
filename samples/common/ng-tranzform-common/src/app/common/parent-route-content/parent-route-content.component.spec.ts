import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ParentRouteContentComponent } from './parent-route-content.component';
import { ParentRouteDataService } from './parent-route-data.service';

describe('ParentRouteContentComponent', () => {
  let component: ParentRouteContentComponent;
  let fixture: ComponentFixture<ParentRouteContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
      ],
      declarations: [
        ParentRouteContentComponent,
      ],
      providers: [
        ParentRouteDataService,
        {
          provide: ActivatedRoute,
          useValue: {},
        }, {
          provide: Router,
          useValue: {
            events: Observable.of({}),
            isActive: () => {},
          },
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRouteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
