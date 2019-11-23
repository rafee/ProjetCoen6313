import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {ExchangeIdService} from '../dashboard/exchange-id.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AddPatientComponent} from '../add-patient/add-patient.component';
import {UpdatePatientComponent} from '../update-patient/update-patient.component';
import {RefreshListService} from '../dashboard/refresh-list.service';
import {ThyroidInfoComponent} from '../thyroid-info/thyroid-info.component';

/*const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};
*/

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  message:string;
  doctor:any;
  patients:any;
  patientData:any;
  msgRef:any;
  resp:any;
  
  req={};

  constructor(private refresh: RefreshListService, public dialog: MatDialog, private exId: ExchangeIdService, private http: HttpClient) { }

  ngOnInit() {

    this.exId.currentMessage.subscribe(message => this.message = message);

    console.log(this.message);

    

    this.http.get('/doctors/'+this.message).subscribe(data => {
      this.doctor=data;
      this.patients = data['patients'];
      this.patientData=this.patients['data'];
      console.log(this.patients);
      console.log(this.doctor);
    });



  
    

     

    

  }

  AddPatient(){

    const dialogRef = this.dialog.open(AddPatientComponent, {
      height: '550px',
      width: '660px'
     
    
    });

     dialogRef.afterClosed().subscribe(result => {  
      this.exId.currentMessage.subscribe(message => this.message = message);

    console.log(this.message);
        this.http.get('/doctors/'+this.message).subscribe(data => {
        this.doctor=data;
        this.patients = data['patients'];
        this.patientData=this.patients['data'];
        console.log(this.patients);
        console.log(this.doctor);
      });
        });  

  }
  UpdatePatient(idp){

   console.log(idp);
  const dialogRef = this.dialog.open(UpdatePatientComponent, {
    height: '550px',
    width: '660px',
    data: {
    patientId: idp
  }
  
  });

    dialogRef.afterClosed().subscribe(result => {  
      this.exId.currentMessage.subscribe(message => this.message = message);

    console.log(this.message);
        this.http.get('/doctors/'+this.message).subscribe(data => {
        this.doctor=data;
        this.patients = data['patients'];
        this.patientData=this.patients['data'];
        console.log(this.patients);
        console.log(this.doctor);
      });
        });  
}

DeletePatient(id){

  this.exId.currentMessage.subscribe(message => this.message = message);

  //console.log(id);
  this.http.delete('/doctors/'+this.message+'/patients/'+id).subscribe();

   this.http.get('/doctors/'+this.message).subscribe(data => {
        this.doctor=data;
        this.patients = data['patients'];
        this.patientData=this.patients['data'];
        console.log(this.patients);
        console.log(this.doctor);
      });

}

CheckThyroid(id){
/*	
this.req={"data":"0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,79,0,0.0,1.5,103,2,135"};
	this.http.post('doctors/predictions',this.req).subscribe(data=> {
   //console.log(data);
   this.resp=data;
    console.log(this.resp);
   });
*/	

   console.log(id);
  const dialogRef = this.dialog.open(ThyroidInfoComponent, {
    height: '550px',
    width: '660px',
    data: {
    patientId: id
  }

  });


	
}




}

