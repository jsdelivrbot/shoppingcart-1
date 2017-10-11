import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSettings as AppConfig } from './../../app-settings';
import { AuthorizationsAndReferralsApi, Authreferraldetail } from '@tranzform/client-ms-authreferral';
import { ActivatedRoute } from '@angular/router';
import { MALE, referralDetailDownloadPath } from './../refferals.constants';
@Component({
  selector: 'app-referral-detail',
  templateUrl: './referral-detail.component.html',
  styleUrls: ['./referral-detail.component.scss']
})
export class ReferralDetailComponent implements OnInit, OnDestroy {
  public authreferraldetail: Authreferraldetail;
  public referenceId: string;
  private routeSub: any;
  public AppConfig= AppConfig;
  readonly MALE = MALE;
  constructor(
    private authreferralApi: AuthorizationsAndReferralsApi,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
       this.referenceId = params['referenceId']; 
       this.getReferralInfo(this.referenceId);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  private getReferralInfo(id: string) {
    const param = {
      'referenceId': id
    };
    this.authreferralApi.authnreferralsReferenceIdGet(param)
    .subscribe(data => {
      this.authreferraldetail = data;
    });
  }

  public downloadFile(fileType) {
    window.open(AppConfig.API_ENDPOINT + '/' + fileType + AppConfig.MSAUTHREFERRAL + referralDetailDownloadPath + '/' + this.referenceId);
  }

}
