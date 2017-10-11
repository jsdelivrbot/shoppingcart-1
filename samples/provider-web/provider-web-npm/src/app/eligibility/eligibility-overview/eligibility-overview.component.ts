import { Component, OnInit, Input } from '@angular/core';
import { AppSettings as AppConfig } from './../../app-settings';
import {MALE, ELIGIBLE } from './../eligibility.constants';

@Component({
  selector: 'app-eligibility-overview',
  templateUrl: './eligibility-overview.component.html',
  styleUrls: ['./eligibility-overview.component.scss']
})
export class EligibilityOverviewComponent implements OnInit {

  public AppConfig = AppConfig;
  public male = MALE;
  public eligible = ELIGIBLE;
  @Input() searchResult;
  @Input() searchedParams;

  constructor() { }

  ngOnInit() {
    // console.log(this.searchResult);
  }

}
