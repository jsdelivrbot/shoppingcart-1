import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { Headers } from '@angular/http';
import { ClaimFormService } from './../claim-form.service';
import * as claimClient from '@tranzform/client-msclaims/index';
import { AppSettings } from './../../app-settings';
import { defaultClaimStatus } from './../claimStatusInquiry.constants';
import { ClaimStatusInquiryConfiguration , ClaimStatusSearchCriteria } from './../claimStatusInquiry.model';




@Component({
  selector: 'app-claimStatusInquiry',
  templateUrl: './claimStatusInquiry.component.html',
  styleUrls: ['./claimStatusInquiry.component.scss']
})
export class ClaimStatusInquiryComponent implements OnInit {
  private tabItems = [
    {
    routerPath: 'search',
    svgPath: 'assets/common/icons/SearchIcon.svg',
    label: 'Search Claims',
  },
  {
    routerPath: 'create',
    svgPath: 'assets/common/icons/icon_create_claim.svg',
    label: 'Create Claim',
  }
  ];
  constructor(
  ) { }

  ngOnInit() {
  }

}
