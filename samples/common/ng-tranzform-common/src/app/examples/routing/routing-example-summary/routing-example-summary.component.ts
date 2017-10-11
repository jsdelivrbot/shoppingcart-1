import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ParentRouteDataService } from '../../../common/parent-route-content';

@Component({
  selector: 'tzf-routing-example-summary',
  templateUrl: './routing-example-summary.component.html',
})
export class RoutingExampleSummaryComponent implements OnInit {
  id: number;

  parentTextboxValue: string;
  textBoxValue: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private parentRouteDataService: ParentRouteDataService,
  ) {
    activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit () {
    this.parentRouteDataService.observableFor('routingExample').subscribe(data => {
      this.parentTextboxValue = data.textboxValue;
    });
  }

  sendToParent () {
    this.parentRouteDataService.send('routingExample', this.textBoxValue);
  }
}
