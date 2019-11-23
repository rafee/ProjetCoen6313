import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {

  message:string;

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  patients:any;
  doctor:any;
  patientData:any;
  title = 'My first AGM project';
  lat = 45.4586567;
  lng = -73.641781218;

  constructor(private exId: ExchangeIdService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

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

UpdatePatients(){


}



}
