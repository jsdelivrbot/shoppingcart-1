import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as claimClient from '@tranzform/client-msclaims/index';
import * as msProviderClient from '@tranzform/client-msprovider/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/first';
import { claimStatus } from './../claimStatusInquiry.constants';
import { dateConfig } from './../claimStatusInquiry.constants';
import { mappingid } from './../claimStatusInquiry.constants';
import { ClaimStatusInquiryConfiguration  } from './../claimStatusInquiry.model';


@Injectable()
export class ClaimSearchResolver implements Resolve<claimClient.MasterDataDetail> {
    constructor(private claimApi: claimClient.ClaimsApi, private providerApi: msProviderClient.ProviderApi,private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClaimStatusInquiryConfiguration> | Promise<ClaimStatusInquiryConfiguration> | any {
        return Observable.forkJoin([this.claimApi.claimsCategoryGet({ category: claimStatus }),
        this.claimApi.claimsCategoryGet({ category: dateConfig }),
        this.providerApi.providersGet()])
            .map(results => {
                const claimstatus = results[0];
                const dateConfig = results[1];
                let providerOptions: Array<msProviderClient.ProviderDetail> = results[2];
                providerOptions = providerOptions.map(p => {
                    const provider = Object.create({});
                    provider.text = p.providerFirstName + ' ' + p.providerLastName;
                    provider.value = p.providerId;
                    return provider;
                });
                return { claimStatus: claimstatus.data, dateConfig: dateConfig.data, providerOptions: providerOptions };
            }).first().catch(e => Observable.of({ claimStatus: [], dateConfig: [], providerOptions: [] }));
    }
}

