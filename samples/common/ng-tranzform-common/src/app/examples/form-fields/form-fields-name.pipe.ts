import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formFieldName',
  pure: false
})
export class FormFieldsNamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const name = value.firstName + ' ' + value.middleName + ' ' + value.lastName;
    if (name.match(/[^ ]/)) {
      return name;
    }
  }
}
