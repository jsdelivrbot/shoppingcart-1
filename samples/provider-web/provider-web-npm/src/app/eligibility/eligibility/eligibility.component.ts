import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { Headers } from '@angular/http';
import { AppSettings } from './../../app-settings';
import { EligibilityApi, IeligibilityGetParams } from '@tranzform/client-eligibility/api/EligibilityApi';
import { MemberEligibility } from '@tranzform/client-eligibility/model/MemberEligibility';
import { Logger } from 'angular2-logger/core';
import { EligibilityDataServiceService } from './../eligibility-data-service.service';
import { AppSettings as AppConfig } from './../../app-settings';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityComponent implements OnInit {
  public eligibilityResult: MemberEligibility;
  public showError: Boolean = false;
  public searchCriteria: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eligibilityApi: EligibilityApi,
    private log: Logger,
    private eligibilityService: EligibilityDataServiceService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.searchCriteria = {
        tenantenrollmentid: undefined,
        memberfirstname: '',
        membermiddlename: '',
        memberlastname: '',
        dateofbirth: undefined,
        servicefromdate: undefined,
        servicetodate: undefined
      };

}

public onEligibilitySearch(criteria: IeligibilityGetParams) {
  this.eligibilityResult = undefined;
  criteria.dateofbirth = this.datePipe.transform(criteria.dateofbirth, AppConfig.DateFormat);
  criteria.servicefromdate = this.datePipe.transform(criteria.servicefromdate, AppConfig.DateFormat);
  criteria.servicetodate = this.datePipe.transform(criteria.servicetodate, AppConfig.DateFormat);

  this.eligibilityApi.eligibilityGet(criteria).subscribe(
     response => {
       this.eligibilityResult = response;
       this.eligibilityService.eligibilityResult = this.eligibilityResult;
       this.eligibilityService.searchedParams = criteria;
       this.router.navigate(['eligibility', 'results'], { skipLocationChange: true });
     },
     error => {
       this.showError = true;
       setTimeout(_ => {
         this.showError = false;
       }, AppConfig.ERRORTIMEOUT);
       this.log.error(error);
     }
   );
}

fromChild (data) {
    this.searchCriteria = {
        tenantenrollmentid: undefined,
        memberfirstname: '',
        membermiddlename: '',
        memberlastname: '',
        dateofbirth: undefined,
        servicefromdate: undefined,
        servicetodate: undefined
      };
  }

}
