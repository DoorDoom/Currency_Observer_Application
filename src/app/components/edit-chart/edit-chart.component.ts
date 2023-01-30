import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { CustomConvertationsService } from 'src/app/services/custom-convertations.service';
import { DatasetManagerService } from 'src/app/services/dataset-manager.service';
import { GetCurrencyService } from 'src/app/services/get-currency.service';
import { ActivatedRoute } from '@angular/router';
import { Currency } from 'src/app/classes/currency';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { UserManagerService } from 'src/app/services/user-manager.service';


@Component({
  selector: 'app-edit-chart',
  templateUrl: './edit-chart.component.html',
  styleUrls: ['./edit-chart.component.css']
})
export class EditChartComponent implements OnInit,OnDestroy {
  id: number;
  ready=false;
  start=-1;
  currency:Currency;

  constructor(public datasetManager:DatasetManagerService,
    public getCurrency:GetCurrencyService,
    public convertations:CustomConvertationsService,
    private route:ActivatedRoute,
    private userManager:UserManagerService){
      this.id=-1;
      this.currency ={} as Currency;
    }

    ngOnInit(): void {
      this.id=this.route.snapshot.params['id'];
      if(this.id!=-1)
        this.datasetManager.peekById(this.id);
      console.log(this.id);
      this.getCurrencyData1();
      
    }

    changeReady(val:boolean){
      this.ready=val;
    }

    getCurrencyData1(){
      let current =new Date(this.datasetManager.getStartLabel());
      let end =new Date(this.datasetManager.getEndLabel());

      let dates: string[] =[];
      this.datasetManager.cleanLabels();
      console.log(current+" - "+end);
      while(current<=end){
        dates.push( CustomConvertationsService.convertDateToString(current));
        current.setDate(current.getDate() + 1);
      }
      console.log(dates);


      this.getCurrency.getCurrencies(dates)
      .subscribe(response =>{
        for(let i=0;i<response.length;i++){
        console.log(response[i].date);
        this.currency = response[i];
        localStorage.setItem(response[i].date,JSON.stringify(response[i]));
        this.datasetManager.addLabel(response[i].date);
        this.changeReady(true);
        }
      });
    }

    saveData(){
      this.datasetManager.saveElement(this.id);
      this.userManager.saveUser();
    }

    delete(){
      this.datasetManager.deleteElement(this.id);
    }

    cancelChanging(){
      this.datasetManager.cleanCurrentData();
    }

    ngOnDestroy(){
    }
}
