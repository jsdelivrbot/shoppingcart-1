import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'i18plural'
})
export class I18pluralPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value===0){
      return args["=0"];
    }else if(value===1){
      return args["=1"];
    }
    return args["other"];
  }

}
