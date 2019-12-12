import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
//import Chart from 'chart.js';
declare const google: any;
import {AgmCoreModule} from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { GraphDataComponent } from '../graph-data/graph-data.component';
import {ExchangeIdService} from './exchange-id.service';
// core components
/*import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy  {

 
  private subscription: Subscription;
  topicname:'/concordia/test';
  msg: any;
  mqttMSG:any;
  
  subscribedMessage:any;
 // isConnected: boolean = false;
 // @ViewChild('msglog', { static: true }) msglog: ElementRef;

 message:string;

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  patients:any;
  doctor:any;
  patientData:any;
	emergencies:any;
	
	patientName:any;
	patientHeartRate:any;
	patientLocation:any;
	patientLat:any;
	patientLong:any;
	patientInfoLoc:any;
	msgHeart:any;
	msgsEmergencies=[];
	jsonMessage:any;
	ThereIsEmergency:boolean;
	pat:any;
  title = 'My first AGM project';
  lat = 45.494927;
  lng = -73.580304;
  
  patiData:any;

  constructor(private exId: ExchangeIdService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private http: HttpClient, private _mqttService: MqttService) {

 this.subscription = this._mqttService.observe('healthcare/emergencies').subscribe((message: IMqttMessage) => {
      this.mqttMSG = message.payload.toString();
	  //console.log(this.mqttMSG);
	  
	  this.subscribedMessage=message.payload.toString();
	  
	  
	  
	  this.jsonMessage=JSON.parse(this.subscribedMessage);
	  
	  this.msgsEmergencies.push(JSON.parse(this.subscribedMessage));
	  
		this.patientName=this.jsonMessage['name'];
		this.patientHeartRate=this.jsonMessage['heartrate'];
		this.patientLocation=this.jsonMessage['location'];
		this.ThereIsEmergency=true;
		if(this.patientHeartRate>=95){
			
			this.msgHeart='High heartrate :'+this.patientHeartRate+'bpm';
			
			
			
		}else if (this.patientHeartRate<=60){
			
			this.msgHeart='Low heartrate :'+this.patientHeartRate+'bpm';
			
		}
	//	this.patientLat=this.patientLocation['latitude'];
	//	this.patientLong=this.patientLocation['longitude'];
		
		
		
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
    });	  
	
	
  }

  ngOnInit() {

   /* this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());*/
    let id=this.route.snapshot.params['id'];

    if(id==null){
      this.exId.currentMessage.subscribe(message => id = message);

    }

    this.exId.changeMessage(id);

    this.http.get('/doctors/'+id).subscribe(data => {
      this.doctor=data;
      this.patients = data['patients'];
      
      this.patientData=this.patients['data'];
      console.log(this.patients);
      console.log(this.doctor);
    });
   
   this.pat={
		"data":[{
			"steps":0,
			"sleepingHours":0
		}]
	};
	
	  this.patiData=[{
		
			"steps":0,
			"sleepingHours":0
		}];
	this.ThereIsEmergency=false;
    
  }




  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  Navigate(patId){
    //console.log('helloo from the outside');
    const dialogRef = this.dialog.open(GraphDataComponent, {
      height: '550px',
      width: '660px',

      data: {
        patientId: patId
      }


     

    });
  }

UpdatePatients(id_Pat){
	
	console.log(id_Pat);
	let id=this.route.snapshot.params['id'];

    if(id==null){
      this.exId.currentMessage.subscribe(message => id = message);

    }

    this.exId.changeMessage(id);

    this.http.get('/doctors/'+id+'/patients/'+id_Pat).subscribe(data => {
      this.pat=data;
	  console.log(this.pat);
    });
	
	   this.http.get('/doctors/datas/'+id_Pat).subscribe(data => {
      this.patiData=data;
	  console.log(this.patiData);
    });
	


}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
 


  
 /* logMsg(message): void {
    this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  }

  clear(): void {
    this.msglog.nativeElement.innerHTML = '';
  }
*/
}
