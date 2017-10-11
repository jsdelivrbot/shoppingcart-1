import { Component, OnInit, Input } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/
import { AppSettings as AppConfig } from './../../app-settings';
import {YES, FSA, HSA, HRA, SUBSCRIBERASSETDELIMITER} from './../claimStatusInquiry.constants';

@Component({
  selector: 'app-create-claim-member-info',
  templateUrl: './createClaimMemberInfo.component.html',
  styleUrls: ['./createClaimMemberInfo.component.scss']
})
export class CreateClaimMemberInfoComponent implements OnInit {

  readonly AppConfig = AppConfig;
  readonly YES = YES;

  @Input() memberInfo: any;
  public displayAddress: string;


  constructor() {
    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  ngOnInit() {
    /**
     * intitialize the properties for template
     */
    if (<any>this.memberInfo.address) {
      this.displayAddress = this.getDisplyAddress(this.memberInfo.address);
    }

  }
  /**
   * returns a formatted address
   * @param address
   */
  private getDisplyAddress(address: any): string {
    let result = '';
    result += address.address1 ? address.address1 + ', ' : '';
    result += address.address2 ? address.address2 + ', ' : '';
    result += address.address3 ? address.address3 + ', ' : '';
    result += address.city ? address.city + ', ' : '';
    result += address.state ? address.state + ' ' : '';
    result += address.zipCode ? address.zipCode : '';
    return result;
  }
}
