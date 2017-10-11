import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/authenticate/auth.service';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.login();
  }

  public login() {
    this.authService.startSigninMainWindow();
  }

}
