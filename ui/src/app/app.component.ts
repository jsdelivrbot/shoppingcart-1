import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loggedIn = false;
        ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
           this.loggedIn = true;
        }
    }

}
