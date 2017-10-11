import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppSettings as AppConfig } from './../../app-settings';

@Pipe({
  name: 'dateTransform'
})
export class DatePropertiesTransformPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, properties: Array<any>): any {
    return properties.reduce((p, c) => {
      if (p[c]) {
        p[c] = this.datePipe.transform(p[c], AppConfig.DateFormat);
      }
      return p;
    }, value);
  }

}
