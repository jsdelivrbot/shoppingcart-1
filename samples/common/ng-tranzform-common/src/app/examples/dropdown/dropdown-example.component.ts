import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tzf-dropdown-example',
  templateUrl: './dropdown-example.component.html',
  styleUrls: ['./dropdown-example.component.scss']
})
export class DropdownExampleComponent {
  data = [{
    manualText: 'DROPDOWN.OPTIONS.ONE',
    text: 'DROPDOWN.OPTIONS.OPTION_ONE',
    value: '1'
  }, {
    manualText: 'DROPDOWN.OPTIONS.TWO',
    text: 'DROPDOWN.OPTIONS.OPTION_TWO',
    value: '2'
  }, {
    manualText: 'DROPDOWN.OPTIONS.THREE',
    text: 'DROPDOWN.OPTIONS.OPTION_THREE',
    value: '3'
  }];

  simpleValue = '2';
  firstValue: string = undefined;

  dateString = '05/30/2017';
  dateDate = new Date(2017, 4, 30);
  dateUndefined: any;

  phoneNumbers = '1234567890';
  phoneUndefined: string;

  noInitial: boolean;

}
