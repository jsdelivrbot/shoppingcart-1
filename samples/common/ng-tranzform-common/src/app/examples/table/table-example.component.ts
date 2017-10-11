import { Component } from '@angular/core';

@Component({
  selector: 'tzf-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss']
})
export class TableExampleComponent {
  columns: any[];

  data = [{
    id: 1,
    name: 'One',
    date: new Date(2017, 2, 10),
    styled: 'good',
    progress: .8,
  }, {
    id: 2,
    name: 'Two',
    date: new Date(2016, 11, 3),
    styled: 'bad',
    progress: .23,
  }, {
    id: 3,
    name: 'Three',
    date: new Date(2017, 3, 9),
    styled: 'ok',
    progress: .45,
  }];
}
