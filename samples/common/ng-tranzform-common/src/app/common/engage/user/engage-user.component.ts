import { Component } from '@angular/core';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'tzf-engage-user',
  templateUrl: './engage-user.component.html',
  styleUrls: ['./engage-user.component.scss'],
})
export class EngageUserComponent {
  constructor (
    public userService: UserService,
  ) {
  }
}
