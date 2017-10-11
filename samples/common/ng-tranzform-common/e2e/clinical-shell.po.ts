import { browser, element, by } from 'protractor';

export class ShellPage {
  navigateTo() {
    return browser.get('/clinical/use');
  }

  getUserButton () {
    return element(by.id('user'));
  }

  getNavExpandButton () {
    return element(by.id('app-nav-expand'));
  }
}
