import { Injectable, Inject, OnInit, OpaqueToken } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RoleBasedAccessControlApi, CapabilityMap } from '@tranzform/client-authorization';
import { CapabilityConstantUtil } from '../shared/capability.constants';

// export const ACCESSCHECK = new OpaqueToken('accessCheck');

@Injectable()
export class AccessCheckService {
  private capabilitiesObservable: Observable<RoleBasedAccessControlApi[]> = null;
  private cachedData = null;

  constructor(
    private rolesService: RoleBasedAccessControlApi,
    private http: Http,
  ) {
  }

  public initPermissions() {
    this.getCapabilitesCached().subscribe(result => { });
  }

  public getAllPermissions(): Observable<RoleBasedAccessControlApi[]> { // Cache Observable somehow. Limit to 1 call
    if (!this.cachedData) {
      this.capabilitiesObservable.subscribe(result => {
        this.cachedData = result;
      });
    };
    return this.capabilitiesObservable;
  }


  public getCapabilities(capabilityKey: string): Array<any> {
    let list = [];
    if (this.cachedData) {
      const capabilityId = CapabilityConstantUtil.getCapabilityId(capabilityKey);

      if (capabilityId) {
        list = this.cachedData[capabilityId];
      }
    }

    return list;
  }

  getCapabilitesCached() {
    if (this.cachedData) {
      return Observable.of(this.cachedData);
    } else {
      return this.http.request('/assets/data/capabilities.json')
        .map(res => res.json())
        .do((data) => {
          this.cachedData = data;
        });
    }
  }
}
