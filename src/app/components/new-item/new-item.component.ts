import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DatasetManagerService } from 'src/app/services/dataset-manager.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent{

  color:string;
  name:string;
  id:number;
  nextStage:boolean;

  nameFormControl = new FormControl('', [Validators.required]);
  
  optionalColors: string[] = [
    'green',
    'blue',
    'yellow',
    'red',
    'black',
    'pink',
    'violet',
  ];

  constructor(public datasetManager:DatasetManagerService,
    private route:ActivatedRoute){
    this.id=this.route.snapshot.params['id'];
    if(this.id==null){
      this.id=datasetManager.createNewItem();
      console.log("Компонент создан");
      this.color='green';
      this.name='';
      this.nextStage=false;
    }else{
      this.nextStage=true;
      datasetManager.peekById(this.id);
      this.color=datasetManager.getColor();
      this.name=datasetManager.getLabel();
    }
  }

  getDate(rangeDate:Array<string>):void{
    this.datasetManager.addLabel(rangeDate[0]);
    this.datasetManager.addLabel(rangeDate[1]);
    if(this.datasetManager.checkReady() && !this.nameFormControl.hasError('required'))this.nextStage=true;
    else this.nextStage=false;
  }

  setCurrencies(currencies:string[]){
    this.datasetManager.setFromCurrency(currencies[0]);
    this.datasetManager.setToCurrency(currencies[1]);
    this.name=currencies[0]+' - '+currencies[1];
    console.log("Get currencies:"+currencies);
    if(this.datasetManager.checkReady() && !this.nameFormControl.hasError('required'))this.nextStage=true;
    else this.nextStage=false;
  }

  changeReadiness(ready?:boolean){
    console.log("Readiness:"+ready);
    if(this.datasetManager.checkReady() && !this.nameFormControl.hasError('required')&& ready)this.nextStage=true;
    else this.nextStage=false;
  }

  saveIntermediateData(){
    this.datasetManager.setColor(this.color);
    this.datasetManager.setName(this.name);
    console.log("Current data:"+this.datasetManager.showCurrentObject());
    console.log(this.datasetManager.showCurrentObject());
  }
}
