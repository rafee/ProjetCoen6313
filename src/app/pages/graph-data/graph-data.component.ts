import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ExchangeIdService} from '../dashboard/exchange-id.service';
import {Chart} from 'chart.js';
//import * as Highcharts from 'highcharts';
//import { Chart } from 'angular-highcharts';

//import { ChartComponent } from 'angular2-highcharts/index';
//import * as Highcharts from 'highcharts';

/*declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);*/
@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.scss']
})
export class GraphDataComponent implements OnInit {

  data ={};

  id:any;

    graph=[];
	
	datas:any;

    dataGraph=[];
	SleepingHoursGraph=[];
	
	BarChartSteps=[];
	BarChartSleepingHours=[];
	
	dateLabels=[];
	
	date:any;
	
	res:any;
	
/*	chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });
*/
  //options: Object;
  
  /* highcharts = Highcharts;
   chartOptions = {   
      chart: {
         type: "spline"
      },
      title: {
         text: "Monthly Average Temperature"
      },
      subtitle: {
         text: "Source: WorldClimate.com"
      },
      xAxis:{
         categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yAxis: {          
         title:{
            text:"Temperature °C"
         } 
      },
      tooltip: {
         valueSuffix:" °C"
      },
      series: [
         {
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
         },
         {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
         },
         {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
         },
         {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
         }
      ]
   };
  */
  
  
  

  @ViewChild('chartVar') refObj: any;
  constructor(private exId: ExchangeIdService, public dialog: MatDialog, private http: HttpClient, private router: Router, @Inject(MAT_DIALOG_DATA) public patientId: any) {}

  ngOnInit() {


    this.exId.currentMessage.subscribe(message => this.id = message);
//this.http.get('/doctors/'+this.id+'/patients/'+this.patientId['patientId']+'/data').subscribe(data => {
  // x: Date.parse(data[0]['createdAt']),
  //y: data[0]['value']};
  
  this.http.get('/doctors/datas/'+this.patientId['patientId']).subscribe(data => {
console.log(data);

  this.data=data
  console.log(this.data);
  for (var i=0; i < Object.keys(this.data).length ;i++) {

  console.log(this.data[i]['steps']);
  
  //  this.date=(this.data[i]['date']).toString();
  
 // console.log(this.date.substr(0,9));
 // this.graph.push(this.data[i]['createdAt'], this.data[i]['value']);
 //  this.dateLabels.push((this.date.substr(0,10)));
   
 // console.log((this.data[i]['date']));
  

  this.dateLabels.push((this.data[i]['date']));
 //console.log(extractedDate);
   this.dataGraph.push(this.data[i]['steps']);
   this.SleepingHoursGraph.push(this.data[i]['sleepingHours']);
  // console.log(this.dataGraph)
  
   
  }
  
  //this.dataGraph=[1200,2200,3000];
  
  console.log(this.dataGraph);
  console.log(this.SleepingHoursGraph);
//});
//console.log(this.dataGraph);
 // this.renderChart();
  /*this.options = {

    title: {
      text: 'steps'
    },
    xAxis: {
      //opposite: true
	  type:'category'
    },
    yAxis: {
      opposite: true,
      plotLines: [{
        value: 90,
        color: 'green',
        dashStyle: 'shortdash',
        width: 2,
        label: {
          text: 'Threshold'
        }
      }],
      exporting: {
        enabled: false
      }
    },

    series: [{
      name: 'Steps',
	 
      data: [
                {
                    name: "Chrome",
                    y: 62.74,
                    drilldown: "Chrome"
                },
                {
                    name: "Firefox",
                    y: 10.57,
                    drilldown: "Firefox"
                },
                {
                    name: "Internet Explorer",
                    y: 7.23,
                    drilldown: "Internet Explorer"
                },
                {
                    name: "Safari",
                    y: 5.58,
                    drilldown: "Safari"
                },
                {
                    name: "Edge",
                    y: 4.02,
                    drilldown: "Edge"
                },
                {
                    name: "Opera",
                    y: 1.92,
                    drilldown: "Opera"
                },
                {
                    name: "Other",
                    y: 7.62,
                    drilldown: null
                }
            ]
    }
    ]

  }
  */
  
  

  this.BarChartSteps = new Chart('barChartSteps', {
  type: 'bar',
	data: {
 labels: this.dateLabels,
 /*datasets: [{
     label: 'Steps',
     data: this.dataGraph,
     backgroundColor: "blue",
     
 },
  
 {
     label: 'Sleeping Hours',
     data: this.SleepingHoursGraph,
     backgroundColor:"red",

	 type:'bar'
 }]*/
 
 datasets: [{
    label: "Steps",
    backgroundColor:  'rgba(153, 102, 255, 0.2)',
	
    data: this.dataGraph
  }]
}, 
options: {
 title:{
     text:"Graph Data of The Patient",
     display:true
 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
 }
}
});


  this.BarChartSleepingHours = new Chart('barChartSleepingHours', {
  type: 'bar',
	data: {
 labels: this.dateLabels,
 /*datasets: [{
     label: 'Steps',
     data: this.dataGraph,
     backgroundColor: "blue",
     
 },
  
 {
     label: 'Sleeping Hours',
     data: this.SleepingHoursGraph,
     backgroundColor:"red",

	 type:'bar'
 }]*/
 
 datasets: [{
    label: "Sleeping Hours",
    backgroundColor:  'rgba(75, 192, 192, 0.2)',
	
    data: this.SleepingHoursGraph
  }]
}, 
options: {
 title:{
   
     display:true
 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true
         }
     }]
 }
}
});
  
  
  //this.refObj.chart.series[0].addPoint(this.measures, false);


});




 //Highcharts.chart('container', this.options);

   /* this.options = {
      title : { text : 'Temperature' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };*/
  }
  
  

 
  // add point to chart serie
  /*add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
*/


  onCloseOk(): void {
    const dialogRef=this.dialog.closeAll();
  }
  /*renderChart() {
    this.options = {

      title: {
        text: 'HeartRate'
      },
      xAxis: {
        opposite: true
      },
      yAxis: {
        opposite: true,
        plotLines: [{
          value: 90,
          color: 'green',
          dashStyle: 'shortdash',
          width: 2,
          label: {
            text: 'Threshold'
          }
        }],
        exporting: {
          enabled: false
        }
      },

      series: [{
        name: 'HeartRate',
        data: [ [Date.UTC(1970, 10, 25), 0],
          [Date.UTC(1970, 11,  6), 0.25],
          [Date.UTC(1970, 11, 20), 1.41],
          [Date.UTC(1970, 11, 25), 1.64],
          [Date.UTC(1971, 0,  4), 1.6],
          [Date.UTC(1971, 0, 17), 2.55],
          [Date.UTC(1971, 0, 24), 2.62],
          [Date.UTC(1971, 1,  4), 2.5]]
      }
      ]

    }
  }*/
  //chart: Object;

  /*loadChart(chartInstance) {
    this.chart = chartInstance;
  }*/
}
