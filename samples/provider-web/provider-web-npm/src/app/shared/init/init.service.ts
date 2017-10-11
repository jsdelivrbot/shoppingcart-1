import { Injectable } from '@angular/core';
import { TranslationService } from './translation/translation.service';
//import { LoginService } from './login/login.service';
import { GlobalService } from './global/global.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class InitService {


  initialized: Boolean = false;
  allSet: Observable<boolean>;

  constructor(private translationService: TranslationService, private globalService: GlobalService) {
    console.log('Init service inside');
    this.initializeApp();

  }

  initializeApp() {
    //Update this to get user infromation from service
    this.translationService.changeLanguage('en');
    this.globalService.language = 'es';
    this.globalService.name = 'sam';
    this.globalService.tenant = 'xyz';
    this.initialized = true;
    this.allSet = new Observable(observer => { observer.next(true);observer.complete(); });
  };

  isAllSet(){
    return this.allSet;
  }

}
