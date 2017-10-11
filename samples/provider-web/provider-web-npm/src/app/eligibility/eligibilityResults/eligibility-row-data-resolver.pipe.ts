import { Pipe, PipeTransform } from '@angular/core';
import {NETWORKINDICATOR, INNETWORKCODE, OUTNETWORKCODE , DEDUCTIBLEID, AMOUNT, AMOUNTREMAINING ,
  OUTOFPOCKETID, COINSURANCE, COPAYMENT , AUTHORIZATION, YES, NO,LIMITATION } from './../eligibility.constants';
import { TranslationService } from './../../shared/init/translation/translation.service';
import { AppSettings as AppConfig } from './../../app-settings';
import { CurrencyPipe } from '@angular/common';
@Pipe({
  name: 'eligibilityRowDataResolver'
})
export class EligibilityRowDataResolverPipe implements PipeTransform {

  constructor(private translate: TranslationService, private currency: CurrencyPipe) {
  }

  transform(field: any, data?: any, accordianId?: any): any {
    if (field === NETWORKINDICATOR) {
      if (data[field] === INNETWORKCODE) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.INNETWORK');
      }else if (data[field] === OUTNETWORKCODE) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.OUTNETWORK');
      }
    }

      if (field === AMOUNT) {
        if (accordianId === DEDUCTIBLEID || accordianId === OUTOFPOCKETID) {
      if (data[field] !== undefined && data[field] !== null) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.DEDUCTIBLE.AMOUNT',
        {amount: this.currency.transform(data[field], AppConfig.currency, true, AppConfig.currencyPrecision)});
      } else if (data[AMOUNTREMAINING] !== undefined && data[AMOUNTREMAINING] !== null) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.DEDUCTIBLE.AMOUNTREMAINING',
        {amount: this.currency.transform(data[AMOUNTREMAINING], AppConfig.currency, true, AppConfig.currencyPrecision)});
      }
    }else if (accordianId === LIMITATION) {
      if (data[field] !== undefined && data[field] !== null) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.LIMITATION.AMOUNT',
        {amount: data[field]});
      } else if (data[AMOUNTREMAINING] !== undefined && data[AMOUNTREMAINING] !== null) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.LIMITATION.AMOUNTREMAINING',
        {amount: data[AMOUNTREMAINING]});
      }
    }else if (accordianId === COINSURANCE) {
      if (data[field] !== undefined && data[field] !== null) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.COINSURANCE.AMOUNT',
        {amount: data[field] });
      }
    }else if (accordianId === COPAYMENT) {
      if (data[field] !== undefined && data[field] !== null) {
        return this.translate.getInstantText('ELIGIBILITY.BENEFITS.COPAYMENT.AMOUNT',
        {amount: this.currency.transform(data[field], AppConfig.currency, true, AppConfig.currencyPrecision)});
      }
    }
  }

  if (field === AUTHORIZATION) {
    if (data[field] === true) {
       return this.translate.getInstantText('ELIGIBILITY.BENEFITS.AUTHORIZATION.YES');
    } else if (data[field] === false) {
      return this.translate.getInstantText('ELIGIBILITY.BENEFITS.AUTHORIZATION.NO');
    }
  }
    return data[field];
  }

}
