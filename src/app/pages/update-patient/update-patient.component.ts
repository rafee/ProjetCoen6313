import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { Inject } from '@angular/core';
import {ExchangeIdService} from '../dashboard/exchange-id.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {


  newPatient={};
  patient={};
message: any;
latitude:Number;
longitude:Number;
Name:any;
Age:Number;
Id:any;
Sexe:any;
Conditions:any;
Medecines:any;
Address={};

  constructor(public dialog: MatDialog, private exId: ExchangeIdService, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.exId.currentMessage.subscribe(message => this.message = message);

console.log(this.data['patientId']);

this.http.get('/doctors/'+this.message+'/patients/'+this.data['patientId']).subscribe(data => {
  
  this.patient = data;
  this.Id=this.patient['Id'];
  this.Name=this.patient['Name'];
  this.Age=this.patient['Age'];
  this.Sexe=this.patient['Sexe'];
  this.Conditions=this.patient['Conditions'];
  this.Medecines=this.patient['Medecines'];
  this.Address=this.patient['AddressP'];
  this.latitude=this.Address['latitude'];
  this.longitude=this.Address['longitude'];


});



  }

  updatePatient(id){
    this.exId.currentMessage.subscribe(message => this.message = message);
    this.newPatient={Id:this.Id, Name:this.Name, Age:this.Age, Sexe: this.Sexe, Medecines:this.Medecines, Conditions:this.Conditions, AddressP:{latitude:this.latitude,longitude:this.longitude}};


    this.http.put('/doctors/'+this.message+'/patients/'+id, this.newPatient)
      .subscribe();

      const dialogRef=this.dialog.closeAll();

  }

}
