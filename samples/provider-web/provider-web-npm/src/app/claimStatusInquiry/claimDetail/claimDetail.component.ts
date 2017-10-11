import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as claimClient from '@tranzform/client-msclaims/index';
import { AppSettings as AppConfig } from './../../app-settings';
import { Headers } from '@angular/http';
import { ClaimFormService } from './../claim-form.service';
import * as claimStatusConst from './../claimStatusInquiry.constants';
import {claimDataDownloadPath} from './../claimStatusInquiry.constants';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claimDetail.component.html',
  styleUrls: ['./claimDetail.component.scss']
})
export class ClaimDetailComponent implements OnInit, OnDestroy {

  claimId: string;
 // claimInfo: claimClient.ClaimDetail;
  payeeProviderAddress: Array<claimClient.Provider>;
  serviceProviderAddress: Array<claimClient.Provider>;
  readonly constants = claimStatusConst;
  readonly AppConfig = AppConfig;
  @Input() claimInfo;
  constructor(
    private activatedRoute: ActivatedRoute,
    private claimApi: claimClient.ClaimsApi,
    private datePipe: DatePipe,
    private service: ClaimFormService
  ) { }
  ngOnDestroy() {
  }
  ngOnInit() {
    this.claimId = this.service.getFormData();
    if (this.claimInfo) {
      this.processClaimInfoForUI();
    } else {
      this.getClaimInfo(this.claimId);
    }
  }

  getClaimInfo(id: string) {
    const param: any = {
      'claimid': id,
      'tenantenrollmentid': 'M1001',
      'claimtype': 'Medical'
    };

    this.claimApi.claimsClaimidGet(param, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'tenant-id': 'HZ0001',
        'username': 'M1001@HZ0001.com',
        'for-username': 'M1001',
        'authorities': 'PROVIDER'
      })
    }).subscribe((data: any) => {
      // TODO  needs to be changed after service changes
      this.claimInfo = data;
      this.processClaimInfoForUI();
    },
    // TODO handle differently when error
      error => { console.log('Error occored while getting data'); } );
  }
  private processClaimInfoForUI () {
     // getting the payee and service prodviders address information separately
      if (this.claimInfo.payeeProviderId) {
       this.payeeProviderAddress =  this.claimInfo.providers.filter(provider => provider.providerId === this.claimInfo.payeeProviderId);
      }
      if (this.claimInfo.serviceProviderId) {
       this.serviceProviderAddress =  this.claimInfo.providers.filter(provider => provider.providerId === this.claimInfo.serviceProviderId);
      }
      // transfoming cliamDetail to merge diagnosis and claimdetail

      // adding display date for claim type accordian
      Object.assign(this.claimInfo,
        {
          'displayDate': this.datePipe.transform(new Date(this.claimInfo.lowServiceDate), AppConfig.DateFormat) +
          ' - ' + this.datePipe.transform(new Date(this.claimInfo.highServiceDate), AppConfig.DateFormat)
        });

      this.claimInfo.claimLineDetails.forEach(l => {
        const diagnosis = this.claimInfo.diagnosisDetails.filter(d => d.diagnosisCode === l.primaryDiagnosisCode)[0];
        if (diagnosis) {
          Object.assign(l, diagnosis);
        }
        // add dates for display purpose
        Object.assign(l,
          {
            'displayDate': this.datePipe.transform(new Date(l.serviceFromDate), AppConfig.DateFormat) +
            ' - ' + this.datePipe.transform(new Date(l.serviceToDate), AppConfig.DateFormat)
          });
      });
  }
  public downloadFile(fileType) {
    window.open(AppConfig.API_ENDPOINT + '/' + fileType + claimDataDownloadPath + '/' + this.claimId);
  }




}
