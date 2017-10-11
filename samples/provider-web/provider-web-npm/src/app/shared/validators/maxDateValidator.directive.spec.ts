import { MaxDateValidatorDirective } from './maxDateValidator.directive';

import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('Max Date Validator', () => {
  it('should create an instance', () => {
    const directive = new MaxDateValidatorDirective();
    expect(directive).toBeTruthy();
  });

});
