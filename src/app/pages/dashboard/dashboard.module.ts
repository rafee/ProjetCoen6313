import { NgModule, ApplicationRef } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {AgmCoreModule} from '@agm/core';









@NgModule({
  imports: [
   
    DashboardRoutingModule,
    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCh15HotHjrQ_65i2V5RIpJOKDjIqZm_2E'
    })
  ],
  declarations: [ DashboardComponent],
  bootstrap: [ DashboardComponent]


})
export class DashboardModule { }
