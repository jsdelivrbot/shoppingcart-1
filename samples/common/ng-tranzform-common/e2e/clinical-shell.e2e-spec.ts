import { Accessibility } from './common';
import { ShellPage } from './clinical-shell.po';

describe('Shell', () => {
  const shell = new ShellPage();
  const accessibility = new Accessibility();

  beforeEach(() => {
    shell.navigateTo();
  });

  it('should be accessible', () => {
    accessibility.analyze();
  });

  it('expanded app nav should be accessible', () => {
    shell.getUserButton().click();
    accessibility.analyze();
  });

  it('user menu should be accessible', () => {
    shell.getNavExpandButton().click();
    accessibility.analyze();
  });
});
