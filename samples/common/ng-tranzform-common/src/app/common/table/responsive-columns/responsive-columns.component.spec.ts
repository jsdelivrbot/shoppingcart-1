import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableModule } from 'primeng/components/datatable/datatable';

import { ResponsiveColumnsComponent } from './responsive-columns.component';

describe('ResponsiveColumnsComponent', () => {
  let component: ResponsiveColumnsComponent;
  let fixture: ComponentFixture<ResponsiveColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DataTableModule,
      ],
      declarations: [
        ResponsiveColumnsComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
