import { Component,OnDestroy,OnInit } from '@angular/core';
import { ChartData } from 'src/app/classes/chart-data';
import { Observable, of} from 'rxjs';
import { map, tap } from 'rxjs/operators'

import { DatasetManagerService } from 'src/app/services/dataset-manager.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnDestroy,OnInit{
  count:number;
  list: ChartData[];

  constructor(private datasetManager:DatasetManagerService, private userManager:UserManagerService){
    this.list = [];
    this.count=0;
  }

  ngOnDestroy(): void {
    console.log("Глав окно уничтожено");
  }

  delete(id: number){
    this.datasetManager.deleteElement(id);
    this.count--;
    this.userManager.saveUser();
  }

  obs = new Observable((observer)=>{});
  ngOnInit(): void {
    this.userManager.pickUserData();
    this.list = this.datasetManager.getData();
    console.log("Глав окно  " + this.list);
    this.count=this.list.length;
    console.log(this.list.length);
  }
  
}
