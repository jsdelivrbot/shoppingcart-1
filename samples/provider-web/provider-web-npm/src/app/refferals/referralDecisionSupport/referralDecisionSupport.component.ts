import { Component, OnInit } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-referralDecisionSupport',
  templateUrl: './referralDecisionSupport.component.html',
  styleUrls: ['./referralDecisionSupport.component.scss']
})
export class ReferralDecisionSupportComponent implements OnInit {

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
