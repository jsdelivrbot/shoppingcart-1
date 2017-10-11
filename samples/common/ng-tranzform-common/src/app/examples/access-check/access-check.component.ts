import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tzf-access-check',
  templateUrl: './access-check.component.html',
  styleUrls: ['./access-check.component.scss']
})
export class AccessCheckComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {


  }

}
