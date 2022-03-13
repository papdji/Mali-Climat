import { InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { DatePipe} from '@angular/common';
import localeFr from '@angular/common/locales/fr';




   @Pipe({
     name: 'customDate'

   })
   export class CustomDatePipe extends
                DatePipe implements PipeTransform {
     transform(value: any, args?: any): any {
       return super.transform(value, "EEEE, d MMMM, y,");
     }
      DATE_PIPE_DEFAULT_TIMEZONE: InjectionToken<string>;
      
   }
