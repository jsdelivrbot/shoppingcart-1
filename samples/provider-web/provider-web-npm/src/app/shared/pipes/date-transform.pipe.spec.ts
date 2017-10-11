import { DatePropertiesTransformPipe } from './date-transform.pipe';

describe('DateTransformPipe', () => {
  const datePipe = jasmine.createSpyObj('datetrans', ['transform']);
  it('create an instance', () => {
    const pipe = new DatePropertiesTransformPipe(datePipe);
    expect(pipe).toBeTruthy();
  });
});
