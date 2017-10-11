import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccessCheckService } from './common/shared/access-check.service';
import { RoleBasedAccessControlApi } from '@tranzform/client-authorization';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  private validated = false;

  constructor(private accessCheckService: AccessCheckService, private router: Router) {
  }

  canActivate() {
    return this.isReady();
  }

  isReady() {
    // To Do
    return this.validated;
  }
}
