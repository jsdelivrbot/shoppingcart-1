import { Pipe, PipeTransform } from '@angular/core';
import { Logger} from 'angular2-logger/core';

@Pipe({
    name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

    private log: Logger = new Logger();

    constructor(){}

    transform(value: string) {
       this.log.info("CapitalizePipe.transform method started");
       let  formattedStr ;
        if(value){
            formattedStr = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
        }

        this.log.info("Formatted Pipe=>"+formattedStr);

        this.log.info("CapitalizePipe.transform method finished");
        return formattedStr;
    }
}