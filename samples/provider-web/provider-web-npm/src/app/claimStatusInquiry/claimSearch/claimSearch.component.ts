import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { Headers } from '@angular/http';
import { ClaimFormService } from './../claim-form.service';
import * as claimClient from '@tranzform/client-msclaims/index';
import { AppSettings } from './../../app-settings';
import { defaultClaimStatus } from './../claimStatusInquiry.constants';
import { ClaimStatusInquiryConfiguration , ClaimStatusSearchCriteria } from './../claimStatusInquiry.model';




@Component({
  selector: 'app-claimSearch',
  templateUrl: './claimSearch.component.html',
  styleUrls: ['./claimSearch.component.scss']
})
export class ClaimSearchComponent implements OnInit {
  public quickViewTiles: Array<claimClient.QuickViewDetail>;
  public configuration: ClaimStatusInquiryConfiguration;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ClaimFormService,
    private claimApi: claimClient.ClaimsApi
  ) { }

  ngOnInit() {
    this.getQuickViewTileData();
    this.activatedRoute.data
      .subscribe(data => {
         this.configuration = data.configData;
      });
  }

  public showResults(searchCriteria: ClaimStatusSearchCriteria, quickview?: boolean) {
    const data = Object.create({});
    data.quickview = quickview;
    // TODO remove after service changes
    if (searchCriteria.providerid && Array.isArray(searchCriteria.providerid) && !searchCriteria.providerid.length) {
          searchCriteria.providerid = this.configuration.providerOptions.map(p => p.value);
     }
    data.inputCriteria = searchCriteria;
    data.configuration = this.configuration;
    this.service.setFormData(data);
    this.router.navigate(['./results'], { skipLocationChange: true, relativeTo: this.activatedRoute });
  }

  private getQuickViewTileData() {
    const param: any = {
      'tenantid': AppSettings.tenantid,
      'userid': AppSettings.userid
    };
    this.claimApi.claimsQuickviewViewsGet(param, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'tenant-id': 'HZ0001',
        'username': 'M1001@HZ0001.com',
        'for-username': 'M1001',
        'authorities': 'PROVIDER'
      })
    }).subscribe((data: any) => {
      this.quickViewTiles = data;
      this.configuration.quickViewTilesProcessed = this.quickViewTiles.map(q => {
        const qViewKeyUpdate = Object.create({});
        qViewKeyUpdate.title = q.qViewTitle;
        const criteria: ClaimStatusSearchCriteria = Object.create({});
        // TODO remove after service changes
        criteria.claimstatus = [q.qViewCriteria.claimStatus];
        if (q.qViewCriteria.providerIds && Array.isArray(q.qViewCriteria.providerIds) && !q.qViewCriteria.providerIds.length) {
          criteria.providerid = this.configuration.providerOptions.map(p => p.value);
        } else {
          criteria.providerid = q.qViewCriteria.providerIds;
        }

        criteria.range = {fromdate: new Date(q.qViewCriteria.serviceStartDate),
        todate: new Date(q.qViewCriteria.serviceEndDate)};
        qViewKeyUpdate.value = JSON.stringify(criteria);
        return qViewKeyUpdate;
      });
    },
      error => { console.log('Error occored while getting data'); });
  }

}
