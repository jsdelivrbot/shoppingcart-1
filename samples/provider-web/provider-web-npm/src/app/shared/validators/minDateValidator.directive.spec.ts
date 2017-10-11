import { MinDateValidatorDirective } from './minDateValidator.directive';

import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('Min Date Validator', () => {
  it('should create an instance', () => {
    const directive = new MinDateValidatorDirective();
    expect(directive).toBeTruthy();
  });

});
