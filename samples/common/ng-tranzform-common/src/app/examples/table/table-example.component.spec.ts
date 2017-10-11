import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableModule } from 'primeng/components/datatable/datatable';

import { ProgressBarModule } from '../../common/progress-bar';
import { TableModule } from '../../common/table';

import { TableExampleComponent } from './table-example.component';

describe('TableExampleComponent', () => {
  let component: TableExampleComponent;
  let fixture: ComponentFixture<TableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DataTableModule,
        ProgressBarModule,
        TableModule,
      ],
      declarations: [
        TableExampleComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
