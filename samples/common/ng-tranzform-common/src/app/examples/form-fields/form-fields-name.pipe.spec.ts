import { FormFieldsNamePipe } from './form-fields-name.pipe';

describe('NamePipe', () => {
  it('create an instance', () => {
    const pipe = new FormFieldsNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('combines names', () => {
    const pipe = new FormFieldsNamePipe();
    expect(pipe.transform({
      firstName: 'First',
      middleName: 'Middle',
      lastName: 'Last',
    })).toEqual('First Middle Last');
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
