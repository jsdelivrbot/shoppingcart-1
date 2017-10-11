import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formFieldName',
  pure: false
})
export class FormFieldsNamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const name = (value.memberfirstname?value.memberfirstname:'') + ' ' + (value.membermiddlename?value.membermiddlename:'') + ' ' +(value.memberlastname?value.memberlastname:'') ;
    if (name.match(/[^ ]/)) {
      return name;
    }
  }
}
