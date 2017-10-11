import { FormFieldsNamePipe } from './form-fields-name.pipe';

 describe('NamePipe', () => {
  it('create an instance', () => {
    const pipe = new FormFieldsNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('ignores blanks', () => {
    const pipe = new FormFieldsNamePipe();
    const expectedValue= {
      firstName: 'Joey',
      middleName: 'M',
      lastName: 'Geller',
    };
    const order = ['firstName','middleName','lastName']
    expect(pipe.transform(expectedValue,order)).toEqual('Joey M Geller');  

  });
});
