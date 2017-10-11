import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'; /* Use in case of resolver;*/
import { EligibilityDataServiceService } from './../eligibility-data-service.service';
import { PRIMARY, SECONDARY, benefitColumns, benefitAccordianLineItems,
  LIMITATION, eligibilityDataDownloadPath} from './../eligibility.constants';
import { AppSettings as AppConfig } from './../../app-settings';
import { Message } from '@tranzform/client-eligibility/model/Message';
import { AccumSummary } from '@tranzform/client-eligibility/model/AccumSummary';
import { LimitSummary } from '@tranzform/client-eligibility/model/LimitSummary';
import { ParentRouteDataService } from '@tranzform/common/parent-route-content';
import {URLSearchParams} from '@angular/http';




export interface DetailsOverview {
  alternateName: string;
  primaryPayer: string;
  additionalInsurance: string;
  coPay: number;
  deductible: number;
  authorizationRequired: boolean;
}

export interface BenefitLineItem {
  coverageLevel?: string;
  serviceType?: string;
  insuranceType?: string;
  description?: string;
  amount?: number;
  amountRemaining?: number;
  priorAuthRequired?: boolean;
  networkIndicator?: string;
  diagnosisCode?: string;
  message?: Array<Message>;
}

export interface BenefitItem {
  title: string;
  value: Array<BenefitLineItem>;
}

@Component({
  selector: 'app-eligibility-results',
  templateUrl: './eligibilityResults.component.html',
  styleUrls: ['./eligibilityResults.component.scss']
})


export class EligibilityResultsComponent implements OnInit {
  public detailsOverview: DetailsOverview;
  readonly AppConfig = AppConfig;
  readonly benefitColumns = benefitColumns;
  readonly lineItems = benefitAccordianLineItems;
  readonly activeIds = 'Active Coverage';
  public benefitLineItems: Array<BenefitItem>;
  public JSON = JSON;
  public Object = Object;

  public eligibilityResult: any;
  public searchedParams: any;
  public limitItem: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private eligibilityService: EligibilityDataServiceService,
    private parentRouteDataService: ParentRouteDataService) {
  }

  ngOnInit() {
    this.eligibilityResult = this.eligibilityService.eligibilityResult;
    this.searchedParams = this.eligibilityService.searchedParams;
    this.detailsOverview = this.createDetailsOverview();
    this.benefitLineItems = this.createBenefitLineItems();
  }

  private createBenefitLineItems(): any {
    const accumSummary: Array<AccumSummary> = this.eligibilityResult.accumSummary;
    const limitSummary: Array<LimitSummary> = this.eligibilityResult.limitSummary;
    // Itertate the lineIteams and assign it to benifitLineItems
    const benefitLineItems = this.lineItems.map(l => {
      let acc;
      // limitSumamry value will be added when line item id is "limitation"
      if (Array.isArray(limitSummary) && l.id === LIMITATION) {
        l['rowItems'] = limitSummary.reduce((p, limit, i) => {
          limit.coverageLimits.forEach(c => {
            p.push({
              serviceType: limit.serviceType,
              insuranceType: limit.insuranceType,
              description: limit.limitDescription,
              diagnosisCode: limit.diagnosisCode,
              priorAuthRequired: limit.priorAuthRequired,
              amount: c.limitMet,
              coverageLevel: c.coverageLevel
            });

            if (c.limitRemaining !== undefined && c.limitRemaining !== null) {
              p.push({
                serviceType: limit.serviceType,
                insuranceType: limit.insuranceType,
                description: limit.limitDescription,
                diagnosisCode: limit.diagnosisCode,
                priorAuthRequired: limit.priorAuthRequired,
                amountRemaining: c.limitRemaining,
                coverageLevel: c.coverageLevel
              });
            }
          });
          if (limit.messages) {
            p.push({ messages: limit.messages });
          }
          return p;
        }, []);
      } else if (Array.isArray(accumSummary) &&
        (acc = accumSummary.filter(a => a.accumulatorType.toString() === l.id)[0])) {
        l['rowItems'] = acc.tierAccums.reduce((p, c) => { // Iterate through all the tierAccums
          c.accumAmounts.forEach(i => {
            p.push(Object.assign(Object.create({}), i, { networkIndicator: c.tierId, messages: undefined }));
            if (i.amountRemaining !== undefined && i.amountRemaining !== null) {
              p.push(Object.assign(Object.create({}), i, { networkIndicator: c.tierId, amount: undefined, messages: undefined }));
            }
            if (i.messages) {
              p.push({ messages: i.messages });
            }
          });
          return p;
        }, []);
      }

      return l;
    });

    return JSON.parse(JSON.stringify(benefitLineItems));

  }


  private createDetailsOverview(): DetailsOverview {
    const detailsOverview: DetailsOverview = Object.create({});
    if (Array.isArray(this.eligibilityService.eligibilityResult.profile.MemberPersonalDetails)
      && this.eligibilityService.eligibilityResult.profile.MemberPersonalDetails.length) {
      detailsOverview.alternateName =
        this.eligibilityService.eligibilityResult.profile.MemberPersonalDetails[0].attributeDetails.alternateName;
    }
    const additionalInsuarnce = this.eligibilityService.eligibilityResult.additionalInsurance;
    if (Array.isArray(additionalInsuarnce) && additionalInsuarnce.length) {
      let list;
      detailsOverview.primaryPayer = (list = additionalInsuarnce.
        filter(a => a.attributeDetails.insuranceHierarchy === PRIMARY)).length ? list[0].attributeDetails.otherInsuredPayerName : '';

      detailsOverview.additionalInsurance
        = additionalInsuarnce.
          filter(a => a.attributeDetails.insuranceHierarchy === SECONDARY).map(a => a.attributeDetails.otherInsuredPayerName).join(',');
    }
    // TODO need to remove hardcoded values once yaml changes
    detailsOverview.coPay = 20;
    detailsOverview.deductible = 40;
    detailsOverview.authorizationRequired = true;
    return detailsOverview;
  }
  newInquiryForm() {
    this.parentRouteDataService.send('eligibility', {});
    this.router.navigate(['eligibility'], {});
  }


  public downloadFile(fileType) {
    const criteria = this.searchedParams;
    const params = new URLSearchParams();
    for (const key in criteria) {
      if (criteria[key]) {
          params.set(key, criteria[key]);
      }
    }
    window.open(AppConfig.API_ENDPOINT + '/' + fileType + eligibilityDataDownloadPath + '?' + params.toString());
  }
}

