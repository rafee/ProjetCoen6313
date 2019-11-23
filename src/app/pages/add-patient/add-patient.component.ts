import { Component, OnInit } from '@angular/core';
import {ExchangeIdService} from '../dashboard/exchange-id.service';
import { HttpClient } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {RefreshListService} from '../dashboard/refresh-list.service';



@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})


export class AddPatientComponent implements OnInit {
message: any;
latitude:Number;
longitude:Number;
Name:any;
Age:Number;
Id:any;
Sexe:any;
Conditions:any;
Medecines:any;
initialData={};
idInitialPatient:any;
initial={};






patient={};
  constructor(private refresh: RefreshListService, public dialog: MatDialog, private exId: ExchangeIdService, private http: HttpClient) { }

  ngOnInit() {

    
  }





  savePatient() {
    this.exId.currentMessage.subscribe(message => this.message = message);
this.patient={Id:this.Id, Name:this.Name, Age:this.Age, Sexe: this.Sexe, Medecines:this.Medecines, Conditions:this.Conditions, AddressP:{latitude:this.latitude,longitude:this.longitude}};
this.initialData={HeartRate:0, Steps:0, SleepingHours:0 };



//console.log(this.patient);
//console.log(this.message);

 

    this.http.post('/doctors/'+this.message+'/patients', this.patient).subscribe(data=> {
   //console.log(data);
   this.idInitialPatient=data;
   this.http.post('/doctors/'+this.message+'/patients/'+this.idInitialPatient+'/data',this.initialData).subscribe(message =>{
     console.log(message);
   });
    

   
   
    });
   
   // 
    const dialogRef=this.dialog.closeAll();
     
  }



  Close(){
    const dialogRef=this.dialog.closeAll();
  }
}
