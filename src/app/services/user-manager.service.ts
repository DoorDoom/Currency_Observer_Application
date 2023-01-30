import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { DatasetManagerService } from './dataset-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  user:string|null;
  constructor(private datasetManager:DatasetManagerService) { 
    this.user=null;
  }

  pickUserData(){
    this.user=localStorage.getItem('Katya');
    if(this.user==null){ this.createUser();
    }
    else this.datasetManager.setData(this.user);
  }

  createUser(){
    localStorage.setItem('Katya','[]');
    this.datasetManager.setData('[]');
  }

  saveUser(){
    localStorage.setItem('Katya',JSON.stringify(this.datasetManager.getData()));
  }
}
