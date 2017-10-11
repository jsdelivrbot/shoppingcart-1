import { AngularSuitePage } from './app.po';

describe('angular-suite App', () => {
  let page: AngularSuitePage;

  beforeEach(() => {
    page = new AngularSuitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
