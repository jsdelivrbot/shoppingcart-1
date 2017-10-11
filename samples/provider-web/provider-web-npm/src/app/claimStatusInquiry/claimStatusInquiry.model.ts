import {Data} from '@tranzform/client-msclaims/model/Data';

export interface ClaimStatusSearchCriteria {
  claimid?: string;
  providerid?: Array<string> | string;
  claimstatus?: Array<string>;
  range?: { fromdate: Date, todate: Date }
}


export interface ClaimStatusInquiryConfiguration {
  claimstatus: Array<Data>;
  dateConfig: Array<Data>;
  providerOptions: Array<{ text: string; value: string }>;
  quickViewTilesProcessed: Array<{ title: string; value: string }>;
}
