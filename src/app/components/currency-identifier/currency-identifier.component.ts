import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { DatasetManagerService } from '../../services/dataset-manager.service';

interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-currency-identifier',
  templateUrl: './currency-identifier.component.html',
  styleUrls: ['./currency-identifier.component.css']
})


export class CurrencyIdentifierComponent implements OnInit{

  @Output() changeCurrencies = new EventEmitter()
  currency2=['',''];

  optionalCurrencies: Currency[] = [
    {value: 'EUR', viewValue: '(EUR) Euro'},
    {value: 'USD', viewValue: '(USD) US Dollar'},
    {value: 'RUB', viewValue: '(RUB) Russian Ruble'},
    {value: 'GEL', viewValue: '(GEL) Lari'},
    {value: 'AMD', viewValue: '(AMD) Armenian Dram'},
    {value: 'BYN', viewValue: '(BYN) Belarussian Ruble'},
    {value: 'CNY', viewValue: '(CNY) Yuan Renminbi'},
    {value: 'CAD', viewValue: '(CAD) Canadian Dollar'},
    {value: 'MXN', viewValue: '(MXN) Mexican Peso'},
    {value: 'BRL', viewValue: '(BRL) Brazilian Real'},
    {value: 'GBP', viewValue: '(GBP) Pound Sterling'},
    {value: 'VUV', viewValue: '(VUV) Vatu'},
  ];

  constructor(public datasetManager:DatasetManagerService){
  }

  ngOnInit(): void {
    this.currency2[0]=this.datasetManager.getFromCurrency();
    this.currency2[1]=this.datasetManager.getToCurrency();
    console.log(this.currency2[0]+"currecies2"+this.currency2[1]);
  }

  changeValues(){
    var temp:string ='';
    temp=this.currency2[1];
    this.currency2[1]=this.currency2[0];
    this.currency2[0]=temp;
    this.newCurrencies();
  }

  newCurrencies(){
    if(this.currency2.indexOf('')==-1)
      this.changeCurrencies.emit(this.currency2);
    console.log("In currencies:"+this.currency2);
  }

  ngOnDestroy(): void {
    console.log("Компонент уничтожен");
  }
}

