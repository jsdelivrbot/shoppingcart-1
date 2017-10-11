import { Component, OnInit } from '@angular/core';
import { REFERRAL_TAB_ITEMS } from './../refferals.constants';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-refferals',
  templateUrl: './refferals.component.html',
  styleUrls: ['./refferals.component.scss']
})
export class RefferalsComponent implements OnInit {
  readonly REFERRAL_TAB_ITEMS = REFERRAL_TAB_ITEMS;

  constructor() { }

  ngOnInit() {
    /** Logic to get data from resolver modify to use
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });
  */

  }

}
