import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formFieldName',
  pure: false
})
export class FormFieldsNamePipe implements PipeTransform {
  transform(value: any, order:any[], delimiter=' '): any {
       const name = order.reduce((fullname,key)=>
       {
         return fullname+(value[key]?value[key]:'')+delimiter;
       }
       ,'')
       return name.trim();
      }
}