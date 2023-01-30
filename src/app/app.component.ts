import { Component } from '@angular/core';
import { GetCurrencyService } from './services/get-currency.service';
import { OnInit } from '@angular/core';
import {Currency} from './classes/currency'
import { CustomConvertationsService } from './services/custom-convertations.service';
import { DatasetManagerService } from './services/dataset-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currency_Market';

  currency:Currency;
 currency1:String='';
 start:string;
 end:string

  constructor(public getCurrencyService:GetCurrencyService, public datasetManager:DatasetManagerService){
   this.currency ={} as Currency;
   this.start="";
   this.end="";
  }
  
  ngOnInit():void {
  }
}
