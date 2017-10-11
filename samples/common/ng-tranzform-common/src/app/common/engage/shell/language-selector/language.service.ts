import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/first';

import { MasterData, MasterDataManagementApi } from '@tranzform/client-mdm';

@Injectable()
export class LanguageService {
  getLanguages () {
    const langSubject = new ReplaySubject<MasterData>();
    langSubject.next({
      data: [{
        code: 'en-US'
      }, {
        code: 'es-ES'
      }]
    });
    langSubject.complete();

    return langSubject.asObservable().first();
  }
}
