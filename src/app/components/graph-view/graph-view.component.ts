import { Component, EventEmitter, Output,Input,OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto'
import { ChartData } from '../../classes/chart-data';
import { DatasetManagerService } from '../../services/dataset-manager.service';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnDestroy{
  public chart: any;
  @Input() id:number;
  @Output() chartReady = new EventEmitter<boolean>()

  newData: any[];

 constructor(public datasetManager:DatasetManagerService){
  this.newData = [];
  console.log("Constructor Chart");
  this.id=-1;
 }

 ngOnInit(): void {
  if(this.id!=-1) this.datasetManager.peekById(this.id);
  console.log("Start creating Chart"+this.id);
  this.createChart(this.id);
  console.log("End creating Chart"+this.id);
}

createChart(id:number){
  this.chart = new Chart("CurrencyLineChart", {
    type: 'line', //this denotes tha type of chart
    data: {// values on X-Axis
      labels: [], 
       datasets: []},
    options: {
      maintainAspectRatio:false,
      aspectRatio:2.5
    }
  });

  this.chart.canvas.setAttribute("id", String(id));
if(this.datasetManager.getDataForChartWithoutOperation.length==0){
  this.datasetManager.cleanDataForChart();
  this.datasetManager.sortLabels();
  this.newData = this.datasetManager.getDataForChart();
}else{
  this.datasetManager.peekById(id);
  this.newData = this.datasetManager.getDataForChartWithoutOperation();
}
  this.chart.data.labels=this.datasetManager.getLabels();
  this.chart.data.datasets=this.newData;

  this.chartReady.emit(true);
  this.chart.update();
}

ngOnDestroy(): void {
  console.log("ChartDestroy");
  this.chart.destroy();
}

}
