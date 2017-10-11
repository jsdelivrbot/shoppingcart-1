import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearToAge'
})
export class YearToAgePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const today: Date = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

}
