import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationsAndReferralsApi, Authreferral, AuthorizationAndReferral } from '@tranzform/client-ms-authreferral';
import { ReferralDataList } from './../refferals.model';
import { AppSettings as AppConfig } from './../../app-settings';
import { PLURAL_MESSAGES, PAGINATION_PAGE_SIZE, DATE_QUERY_PROPS, ASC, DSC, referralDataDownloadPath} from './../refferals.constants';
import {URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  readonly PLURAL_MESSAGES = PLURAL_MESSAGES;
  readonly PAGINATION_PAGE_SIZE = PAGINATION_PAGE_SIZE;
  readonly AppConfig = AppConfig;
  public referralDataList: ReferralDataList;
  public authReferralData: AuthorizationAndReferral;
  public sort: any;
  public criteria: any;
  public page: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private authreferralApi: AuthorizationsAndReferralsApi) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { referralDataList: ReferralDataList }) => {
        this.referralDataList = data.referralDataList;
      });
  }

  public searchAuthReferral(criteria, page?, sort?) {
    const finalCriteria = Object.assign({}, criteria);
    if (!page && !sort) {
      this.authReferralData = undefined;
    }
    if (!page) {
      page = { pagenumber: 1 };
    }
    const sortBy = sort ? {sortby: sort.sortField, orderby: (sort.sortOrder > 0) ? ASC : DSC} : undefined;
    Object.assign(finalCriteria, page, sortBy);
    this.authreferralApi.authnreferralsSearchGet(finalCriteria)
      .subscribe(data => {
        this.authReferralData = data;
      });
  }

  public onSubmit(criteria) {
    if (!this.criteria) {
      this.criteria = criteria;
    }else {
      this.criteria = criteria;
      this.searchAuthReferral(this.criteria);
    }
  }

  public downloadFile(fileType) {
    const criteria: any = this.criteria;
    const params = new URLSearchParams();
    for (const key in criteria) {
      if (criteria[key]) {
          params.set(key, criteria[key]);
      }
    }
    window.open(AppConfig.API_ENDPOINT + '/' + fileType + AppConfig.MSAUTHREFERRAL + referralDataDownloadPath + '?' + params.toString());
  }

}
