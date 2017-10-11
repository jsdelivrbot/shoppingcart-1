import { Injectable } from '@angular/core';
import { MemberEligibility } from '@tranzform/client-eligibility/model/MemberEligibility';

@Injectable()
export class EligibilityDataServiceService {

  private _eligibilityResult: any;
  private _searchedParams: any;

  set eligibilityResult(val){
    this._eligibilityResult = val;
  }

  get eligibilityResult(): any{
    return this._eligibilityResult;
  }

  set searchedParams(val){
    this._searchedParams = val;
  }

  get searchedParams(){
    return this._searchedParams;
  }
  constructor() { }

}
