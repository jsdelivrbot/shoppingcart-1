import { Component, OnInit } from '@angular/core';
import { ProgressTabComponent } from './../../shared/components/progressTab/progressTab.component';
import { ProgressTabsComponent } from './../../shared/components/progressTabs/progressTabs.component';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

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
