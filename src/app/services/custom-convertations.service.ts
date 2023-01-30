import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomConvertationsService {

  constructor() { }

  public static convertDateToString(date: Date):string{
    function pad(s: any) { return (s < 10) ? '0' + s : s; }
    return[pad(date.getFullYear()), pad(date.getMonth()+1), date.getDate()].join('-');
  }
}
