import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ExchangeIdService} from '../dashboard/exchange-id.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-thyroid-info',
  templateUrl: './thyroid-info.component.html',
  styleUrls: ['./thyroid-info.component.scss']
})
export class ThyroidInfoComponent implements OnInit {
	
	patient={};
	message:string;
	verif:any;

  constructor(private exId: ExchangeIdService, public dialog: MatDialog, private http: HttpClient,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
	  
	   this.exId.currentMessage.subscribe(message => this.message = message);
	  
	  
	     this.http.get('/doctors/'+this.message+'/patients/'+this.data['patientId']).subscribe(data => {
   
		this.patient = data;
		
		console.log(this.patient);
      
      
     
    });
	  
	  
	  
	  
  }
  
  
  CheckThyroid(id){
	  
	  
	  this.http.get('doctors/predictions/'+id).subscribe(data=> {
   //console.log(data);
   
     console.log(data);
	 this.verif=data;
   });
    

   
   
    }
	  
	  
  

}
