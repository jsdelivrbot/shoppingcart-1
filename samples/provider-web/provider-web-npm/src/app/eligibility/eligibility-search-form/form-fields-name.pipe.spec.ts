import { FormFieldsNamePipe } from './form-fields-name.pipe';

describe('NamePipe', () => {
  it('create an instance', () => {
    const pipe = new FormFieldsNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('ignores blanks', () => {
    const pipe = new FormFieldsNamePipe();
    expect(pipe.transform({
      firstName: '',
      middleName: '',
      lastName: '',
    })).toBeUndefined();
  });
});
