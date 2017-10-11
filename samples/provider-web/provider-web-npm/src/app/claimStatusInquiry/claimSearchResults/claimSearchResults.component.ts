import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { ClaimFormService } from './../claim-form.service';
import { Subscription } from 'rxjs/Subscription';
import * as claimClient from '@tranzform/client-msclaims/index';
import { DatePipe } from '@angular/common';
import { AppSettings as AppConfig } from './../../app-settings';
import {claimid} from './../claimStatusInquiry.constants';
import {claimDetailTable} from './../claimStatusInquiry.constants';
import {claimStatusProps} from './../claimStatusInquiry.constants';
import {claimDataDownloadPath} from './../claimStatusInquiry.constants';
import {claimStatusPageSize} from './../claimStatusInquiry.constants';
import { ClaimStatusSearchCriteria , ClaimStatusInquiryConfiguration } from './../claimStatusInquiry.model';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/
import {URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-claim-search-results',
  templateUrl: './claimSearchResults.component.html',
  styleUrls: ['./claimSearchResults.component.scss']
})
export class ClaimSearchResultsComponent implements OnInit {
  public inputCriteria: ClaimStatusSearchCriteria;
  public searchCriteria: ClaimStatusSearchCriteria;
  public configuration: ClaimStatusInquiryConfiguration;
  public fromQuickView: Boolean = false;
  public claimSearchResults: Array<claimClient.Claim>;
  public claim: claimClient.Claim;
  public claimDetailTable: any = claimDetailTable;
  public claimStatusConst = claimStatusProps;
  public claimDataDownloadPath = claimDataDownloadPath;
  public AppConfig = AppConfig;
  public messages: any = {
    '=0': 'CLAIMSSTATUS.RESULTCOUNTNONE',
    '=1': 'CLAIMSSTATUS.RESULTCOUNTONE',
    'other': 'CLAIMSSTATUS.RESULTCOUNT'
  };
  public pageSize: number;
  public totalRecordCount: number;
  public totalRecordCountView: number;
  public loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private claimApi: claimClient.ClaimsApi,
    private router: Router,
    private service: ClaimFormService,
    private datePipe: DatePipe) {

  }

  ngOnInit() {
    const data = this.service.getFormData();
    this.inputCriteria = data.inputCriteria;
    this.configuration = data.configuration;
    this.fromQuickView = data.quickview;
    this.searchClaims(this.inputCriteria);
  }

  public view(selectedClaim) {
    this.claim = { claimId: selectedClaim.claimId };
    this.service.setFormData(selectedClaim.claimId);
    this.router.navigate(['./detail'], { skipLocationChange: true, relativeTo: this.activatedRoute });
  }
  public searchClaims(criteria: ClaimStatusSearchCriteria, pageNumber = 1) {
    const filtredCriteria = this.getFilterCriteria(criteria, pageNumber);
    // reset the result related fields until service responds
    this.claimSearchResults = [];
    this.totalRecordCount = 0;
    this.claimApi.claimsGet(filtredCriteria).
      subscribe((data: claimClient.ClaimResponse) => {
        // TODO  needs to be changed after service changes
        this.claimSearchResults = data.claimSummary.map(d => (<any>d).attributes);
        this.totalRecordCount = data.totalRecordCount;
        this.pageSize = data.totalRecordCount / claimStatusPageSize;
        // TODO work around for p-table resize
         setTimeout(_ => {
         const evt = document.createEvent('UIEvents');
         evt.initUIEvent('resize', true, false, window, 0);
         window.dispatchEvent(evt);
         });
      },
      error => { console.log('error occored while getting data'); });
  }
  public getFilterCriteria(criteria, pageNumber?) {
    if (criteria) {
      this.searchCriteria = criteria;
    }else {
      criteria = this.searchCriteria;
    }
    const filtredCriteria = JSON.parse(JSON.stringify(criteria));
      // convert the date range to date parameters
    // remove all others if claimid is present
    if (filtredCriteria.claimid) {
      Object.keys(filtredCriteria).forEach(k => {
        if (k !== claimid) {
          delete filtredCriteria[k];
        }
      });
    }else {
      delete filtredCriteria[claimid];
    }
    if (filtredCriteria.range) {
      if (filtredCriteria.range.fromdate) {
      filtredCriteria.fromdate = this.datePipe.transform(filtredCriteria.range.fromdate, AppConfig.DateFormat);
    }
    if (filtredCriteria.range.todate) {
      filtredCriteria.todate = this.datePipe.transform(filtredCriteria.range.todate, AppConfig.DateFormat);
    }
    delete filtredCriteria['range'];
    }
    if (pageNumber) {
      filtredCriteria.pagenumber = pageNumber;
    }
    return filtredCriteria;
  }

  public onPageChange(pageNumber: any) {
    this.searchClaims(undefined, pageNumber);
  }

  public downloadFile(fileType) {
    const criteria = this.getFilterCriteria(this.searchCriteria);
    const params = new URLSearchParams();
    for (const key in criteria) {
      if (criteria[key]) {
          params.set(key, criteria[key]);
      }
    }
    window.open(AppConfig.API_ENDPOINT + '/' + fileType + claimDataDownloadPath + '?' + params.toString());
  }

}
