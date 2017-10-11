import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from './language.service';

@Component({
  selector: 'tzf-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  menuOpen: boolean;

  languages = [];

  languagesById = {
    'en-US': 'English',
    'es-ES': 'Español',
  };

  constructor(
    langService: LanguageService,
    public t: TranslateService,
  ) {
    langService.getLanguages()
      .subscribe(mdmCategory => {
        mdmCategory.data.forEach(language => {
          const langCode = language.code;

          if (this.languagesById[langCode]) {
            this.languages.push(langCode);
          } else {
            console.warn('Unsupported language: ' + langCode);
          }
        });
      });
  }
}
