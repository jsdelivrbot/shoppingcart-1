import { Component, OnInit } from '@angular/core';

/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-careProfile',
  templateUrl: './careProfile.component.html',
  styleUrls: ['./careProfile.component.scss']
})
export class CareProfileComponent implements OnInit {


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
