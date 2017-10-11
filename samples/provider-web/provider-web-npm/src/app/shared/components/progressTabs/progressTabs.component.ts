import { Component, OnInit } from '@angular/core';
import { TabsComponent } from '@tranzform/common/tabs/tabs.component';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-progress-tabs',
  templateUrl: './progressTabs.component.html',
  styleUrls: ['./progressTabs.component.scss']
})
export class ProgressTabsComponent extends TabsComponent implements OnInit {



  ngOnChanges(...args: any[]) {
    /**
      Only fired whenever @Input changes
    **/
  }

  ngOnInit() {
    /** Logic to get data from resolver modify to use
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });
  */

  }

  ngAfterViewInit() {
    /**
      Fired after the component template has been initialized by the model
    **/
  }

  ngAfterViewChecked() {
    /**
      Fired after the component template has been fully updated by the model
    **/
  }

}
