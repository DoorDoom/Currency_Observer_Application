import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, forkJoin } from 'rxjs';
import { Currency } from '../classes/currency';


@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {

  constructor(private http: HttpClient) { }

  // public getCurrencies(date: string): Observable<any> {
  //   const url = 'https://api.exchangerate.host/' + date;
  //   console.log(url);
  //   return this.http.get<any>(url, { responseType: 'json', reportProgress: true }).pipe(retry(3));
  // }

  public getCurrencies(date: string[]): Observable<any> {

    let result: any[] =[];

    for(let i=0;i<date.length;i++){
      result.push( this.http.get<any>('https://api.exchangerate.host/' + date[i], { responseType: 'json', reportProgress: true }));
      console.log("l1.2: " + typeof(result));
    }
    console.log(result);
    console.log("l1.1: " + result.length);
    return  forkJoin(result);
 }

}
