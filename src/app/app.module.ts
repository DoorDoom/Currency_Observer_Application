import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker'  
import { MatNativeDateModule } from '@angular/material/core'  
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { RangeDateForCurrencyComponent } from './components/range-date-for-currency/range-date-for-currency.component';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { OverallComponent } from './components/overall/overall.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { CurrencyIdentifierComponent } from './components/currency-identifier/currency-identifier.component';
import { EditChartComponent } from './components/edit-chart/edit-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/overall', pathMatch: 'full' },
  { path: 'overall',  component: OverallComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'creating', component: NewItemComponent },
  { path: 'creating/:id', component: NewItemComponent },
  { path: 'changing/:id', component: EditChartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RangeDateForCurrencyComponent,
    GraphViewComponent,
    ConfigurationComponent,
    OverallComponent,
    NewItemComponent,
    CurrencyIdentifierComponent,
    EditChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,  
    MatNativeDateModule,    
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
