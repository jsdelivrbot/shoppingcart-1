import { Component, OnInit, Input } from '@angular/core';
import { AppSettings as AppConfig } from './../../app-settings';
import { MALE } from './../eligibility.constants';

@Component({
  selector: 'app-eligibility-profile-information',
  templateUrl: './eligibility-profile-information.component.html',
  styleUrls: ['./eligibility-profile-information.component.scss']
})
export class EligibilityProfileInformationComponent {

  public AppConfig = AppConfig;
  public male = MALE;
  @Input() searchResult;
  constructor() { }
}
