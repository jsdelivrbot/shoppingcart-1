import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import * as claimStatusConst from './../claimStatusInquiry.constants';
import * as claimClient from '@tranzform/client-msclaims/index';
import { ClaimStatusSearchCriteria } from './../claimStatusInquiry.model';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {

  @Input() quickViewData: claimClient.QuickViewDetail;
  @Output() onDetailsClicked: EventEmitter<ClaimStatusSearchCriteria> = new EventEmitter();
  readonly constants = claimStatusConst;
  constructor() { }

  ngOnInit() {
  }

  public viewDetails() {
    const criteria: ClaimStatusSearchCriteria = Object.create({});
    criteria.claimstatus = [this.quickViewData.qViewCriteria.claimStatus];
    criteria.providerid = this.quickViewData.qViewCriteria.providerIds;
    criteria.range = {fromdate: new Date(this.quickViewData.qViewCriteria.serviceStartDate),
    todate: new Date(this.quickViewData.qViewCriteria.serviceEndDate)};
    this.onDetailsClicked.emit(criteria);
  }
}
