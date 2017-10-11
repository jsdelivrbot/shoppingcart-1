import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslationService {

  constructor(private translate: TranslateService, private translateLoader: TranslateLoader) {
    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    //this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');

  }

  changeLanguage(language: any) {
    this.translate.use(language);
  }

   getText(key: string) {
    return this.translate.get(key);
   }

   getInstantText(key:any,params?:any){
    return this.translate.instant(key,params);
   }

}

export function TranslateLoaderFactory(http: any) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
