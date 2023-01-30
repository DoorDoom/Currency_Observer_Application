import { Injectable } from '@angular/core';

import { ChartData, DataToChart } from '../classes/chart-data';


@Injectable({
  providedIn: 'root'
})
export class DatasetManagerService {

  private data: ChartData[];
  private currentData: ChartData;

  constructor() {
    this.data = [];
    this.currentData = {} as ChartData;
    this.currentData.data = [];
    this.currentData.data[0] = {} as DataToChart;
    this.currentData.labelArray = [];
  }

  showCurrentObject() {
    return this.currentData;
  }

  public createNewItem(): number {

    this.currentData = {} as ChartData;
    this.currentData.data = [];
    this.currentData.labelArray = [];

    this.currentData.data[0] = {} as DataToChart;
    this.currentData.id = -1;
    return this.currentData.id;
  }

  public sortById() {
    this.data.sort((a, b) => a.id - b.id)
  }

  public peekById(val: number) {
    this.currentData = this.data.find((obj) => obj.id == val) as ChartData;
    console.log("Выбран элемент:" + this.currentData);
  }


  public setFromCurrency(val: string) {
    this.currentData.fromCurrency = val;
    console.log(this.currentData);
  }
  public setToCurrency(val: string) {
    this.currentData.toCurrency = val;
    console.log(this.currentData);
  }

  public getFromCurrency(): string {
    return this.currentData.fromCurrency;
  }
  public getToCurrency(): string {
    return this.currentData.toCurrency;
  }

  public setColor(val: string) {
    this.currentData.data[0].backgroundColor = val;
  }

  public getColor(): string {
    return this.currentData.data[0].backgroundColor;
  }

  public setName(val: string) {
    this.currentData.data[0].label = val;
    console.log(this.currentData);
  }

  public getDataForChart(): any[] {
    if (this.currentData.id == undefined) {
      console.log("нет id");
      return [];
    }
    this.addData();
    return this.currentData.data;
  }

  public getDataForChartWithoutOperation(): any[] {
    if (this.currentData.id == undefined) {
      console.log("нет id");
      return [];
    }
    return this.currentData.data;
  }


  public addData() {
    var arrDataForChart: string[] = [];
    console.log(this.currentData.labelArray);

    if (this.currentData.fromCurrency == 'EUR') {
      console.log("Сработало FromCurrency EUR");
      for (var i = 0; i < this.currentData.labelArray.length; i++) {
        console.log(this.currentData.labelArray[i]);
        var str = localStorage.getItem(this.currentData.labelArray[i])!;
        var myArray = this.extractCurrecyFromString(str, this.currentData.toCurrency);
        arrDataForChart.push(myArray[0]);
        console.log(arrDataForChart);
      }

    } else {
      if (this.currentData.toCurrency == 'EUR') {
        console.log("Сработало ToCurrency EUR");
        for (var i = 0; i < this.currentData.labelArray.length; i++) {
          console.log(this.currentData.labelArray[i]);
          var str = localStorage.getItem(this.currentData.labelArray[i])!;
          var myArray = this.extractCurrecyFromString(str, this.currentData.fromCurrency);
          myArray[0] = 1.0 / Number(myArray[0]) + '';
          arrDataForChart.push(myArray[0]);
          console.log(arrDataForChart);
        }

      }
      else {
        console.log("Сработало not EUR");
        for (var i = 0; i < this.currentData.labelArray.length; i++) {
          console.log(this.currentData.labelArray[i]);
          var str = localStorage.getItem(this.currentData.labelArray[i])!;
          var fromArray = this.extractCurrecyFromString(str, this.currentData.fromCurrency);
          var toArray = this.extractCurrecyFromString(str, this.currentData.toCurrency);
          fromArray[0] = Number(toArray[0]) / Number(fromArray[0]) + '';
          arrDataForChart.push(fromArray[0]);
          console.log(arrDataForChart);
        }
      }
    }
    console.log(arrDataForChart);
    this.currentData.data[0].data = arrDataForChart;
    console.log(this.currentData);
  }

  getData(): any[] {
    return this.data;
  }

  setData(val:string) {
    this.data=[];
    let obj:ChartData[]=JSON.parse(val);
    console.log(obj);

    if(obj!=undefined) this.data=obj;
  }

  extractCurrecyFromString(str: string, val: string): RegExpExecArray {
    var fullreg = new RegExp("\"" + val + "\":([0-9]*[.])?[0-9]+", "i")
    var numreg = new RegExp("([0-9]*[.])?[0-9]+", "i")
    var myArray = fullreg.exec(str)!;
    console.log(myArray[0]);
    myArray = numreg.exec(myArray[0])!;
    console.log(myArray[0]);
    return myArray;
  }

  public cleanData() {
    this.data.splice(0, this.data.length);
  }

  public cleanCurrentData() {
    this.currentData = {} as ChartData;
    this.currentData.data = [];
    this.currentData.labelArray = [];

    this.currentData.data[0] = {} as DataToChart;
    this.currentData.id = -1;
  }

  public cleanDataForChart() {
    this.currentData.data.slice(0, this.currentData.data.length);
  }

  public addLabel(elem: string) {
    this.currentData.labelArray.push(elem);
    console.log(this.currentData.labelArray);
  }

  public getLabel(): string {
    return this.currentData.data[0].label;
  }

  public cleanLabels() {
    this.currentData.labelArray.splice(0, this.currentData.labelArray.length);
  }

  public getLabels(): string[] {
    return this.currentData.labelArray;
  }

  public getStartLabel(): string {
    return this.currentData.labelArray[0];
  }

  public getEndLabel(): string {
    return this.currentData.labelArray[this.currentData.labelArray.length - 1];
  }

  public sortLabels() {
    this.currentData.labelArray.sort;
  }

  saveElement(val: number) {

    if (this.currentData.id == -1) {
      var length = this.data.length;

      console.log(length);
      if (length > 1) {
        this.sortById();
        var i = this.data[length - 1].id + 1;
        this.currentData.id = i;
      }
      else {
        if (length == 1) {
          var i = this.data[length - 1].id + 1;
          this.currentData.id = i;
        }
        else {
        this.currentData.id = length;
      }
    }

    if (val == -1) {
      this.data.push(this.currentData);
    }
    else {
      console.log("Я тут был");
      let temp = this.data.find((obj) => obj.id == val) as ChartData;
      this.data[this.data.indexOf(temp)] = this.currentData;
    }
    for (let i = 0; i < this.data.length; i++) {
      console.log("Был сохранен элемент:");
      console.log(this.data[i]);
    }
  }
}

  deleteElement(val: number) {
    let temp = this.data.find((obj) => obj.id == val) as ChartData;
    const index = this.data.indexOf(temp);
    this.data.splice(index, 1);
  }

  checkReady():boolean{
    console.log(this.currentData.labelArray.length);
    if(this.currentData.fromCurrency=="") return false;
    if(this.currentData.toCurrency=="") return false;
    if(this.currentData.data[0].label=="") return false;
    if(this.currentData.labelArray.length==0) return false;
    return true;
  }
}
