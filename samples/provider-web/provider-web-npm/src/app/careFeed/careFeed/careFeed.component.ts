import { Component, OnInit } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-careFeed',
  templateUrl: './careFeed.component.html',
  styleUrls: ['./careFeed.component.scss']
})
export class CareFeedComponent implements OnInit {

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
