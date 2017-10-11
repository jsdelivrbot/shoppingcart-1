import { Injectable } from '@angular/core';
import { Resolve , Router , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MDM_QUERY_IDS } from './../refferals.constants';
import {MasterDataManagementApi} from '@tranzform/client-mdm/api/MasterDataManagementApi';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/first';
import { AuthorizationsAndReferralsApi, MasterDataDetail } from '@tranzform/client-ms-authreferral';

import { ReferralDataList } from './../refferals.model';

@Injectable()
export class SearchFormResolver implements Resolve<any>  {
  constructor(private masterDataApi: MasterDataManagementApi,
  private authorizationsAndReferralsApi: AuthorizationsAndReferralsApi) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MasterDataDetail> {
    const category = MDM_QUERY_IDS.REFERRAL_TYPES + ',' + MDM_QUERY_IDS.SERVICE_TYPES + ',' + MDM_QUERY_IDS.STATUS;
    return this.authorizationsAndReferralsApi.authnreferralsCategoryGet({category: category }).map(data => {
      return data.reduce((p, d, i) => {
        p[d.category] = d.data;
        return p;
      }, {});
    }).first().catch(e => Observable.of({}));
  }
}
