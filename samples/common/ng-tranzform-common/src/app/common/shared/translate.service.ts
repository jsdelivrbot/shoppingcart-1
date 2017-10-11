import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from '@ngx-translate/core';

/**
 * Drop in replacement for TranslateService that listens for language changes.
 *
 * TranslateService depends on Http so our HttpService can't depend on it.
 * This makes the language available to it without having to inject it.
 */
@Injectable()
export class TzfTranslateService extends TranslateService {
  private static lang = 'en-US';

  public static get currentLang () {
    return TzfTranslateService.lang;
  }

  /**
   * Intercept the new language to use and make it available in a static way.
   * @param lang
   */
  use (lang: string) {
    TzfTranslateService.lang = lang;
    return super.use(lang);
  }
}
