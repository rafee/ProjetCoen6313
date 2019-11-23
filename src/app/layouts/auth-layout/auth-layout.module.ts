import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCh15HotHjrQ_65i2V5RIpJOKDjIqZm_2E'
    })*/
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
   // DashboardComponent
  ]
})
export class AuthLayoutModule { }
