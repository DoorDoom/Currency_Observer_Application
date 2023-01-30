import { Component, Output, EventEmitter,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomConvertationsService } from '../../services/custom-convertations.service';
import { DatasetManagerService } from '../../services/dataset-manager.service';

@Component({
  selector: 'app-range-date-for-currency',
  templateUrl: './range-date-for-currency.component.html',
  styleUrls: ['./range-date-for-currency.component.css']
})
export class RangeDateForCurrencyComponent implements OnInit{
  rangeDate: Array<string>;
  today = new Date();
  dayOfStart = new Date('2000-01-01');

  rangeFormGroup = new FormGroup({  
    start: new FormControl<Date|null>(null, Validators.required),  
    end: new FormControl<Date|null>(null, Validators.required)  
  })

  @Output() changeRangeDate = new EventEmitter()
  @Output() ready = new EventEmitter()

  constructor(public datasetManager:DatasetManagerService){
    this.rangeDate=[];
  }

  ngOnInit(): void {
    this.rangeFormGroup.setValue({start: new Date(this.datasetManager.getStartLabel()),
       end: new Date(this.datasetManager.getEndLabel())})
  }

  newRangeDate(dateRangeStart: string ,dateRangeEnd: string ){
    let localStartDate= new Date(dateRangeStart);
    let localEndDate= new Date(dateRangeEnd);
    console.log(localStartDate);
    console.log(localEndDate);

    if(this.rangeDate.length>0)
    {
      this.datasetManager.cleanLabels();
      this.rangeDate.splice(0, 2,
       CustomConvertationsService.convertDateToString(localStartDate),
       CustomConvertationsService.convertDateToString(localEndDate));
    }
    else{
      this.rangeDate.push(CustomConvertationsService.convertDateToString(localStartDate));
      this.rangeDate.push(CustomConvertationsService.convertDateToString(localEndDate));
    }

    console.log(this.rangeDate[0]);
    console.log(this.rangeDate[1]);

    this.changeRangeDate.emit(this.rangeDate);
  }

  changeReadiness(){
    this.ready.emit(!this.rangeFormGroup.invalid);
  }
}
