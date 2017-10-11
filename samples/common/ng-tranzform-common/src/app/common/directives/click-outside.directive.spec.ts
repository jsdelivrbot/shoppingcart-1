import { ClickOutsideDirective } from './click-outside.directive';

describe('CloseOnOutsideClickDirective', () => {
  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(null);
    expect(directive).toBeTruthy();
  });
});
