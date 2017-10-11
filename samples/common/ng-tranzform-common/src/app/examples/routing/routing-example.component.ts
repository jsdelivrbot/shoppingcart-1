import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tzf-routing-example',
  templateUrl: './routing-example.component.html',
  styleUrls: ['./routing-example.component.scss']
})
export class RoutingExampleComponent {
  items = [{
    name: 'First',
    id: 1,
  }, {
    name: 'Second',
    id: 2,
  }, {
    name: 'Third',
    id: 3,
  }];

  item: any;
  textboxValue: string;
  childTextboxValue: string;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  view (item) {
    this.item = { name: item.name, textboxValue: this.textboxValue };
    this.router.navigate([item.id], { relativeTo: this.route, skipLocationChange: true });
  }

  fromChild (data) {
    this.childTextboxValue = data;
  }
}
