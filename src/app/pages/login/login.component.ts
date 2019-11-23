import { Component, OnInit, OnDestroy } from '@angular/core';
//import {MatDialog, MatDialogRef} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
//import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ExchangeIdService} from '../dashboard/exchange-id.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
username:String;
password:String;
show :Boolean;
doctors:any;

  constructor(private exId: ExchangeIdService, private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
this.username='';
this.password='';
   
  }
  ngOnDestroy() {
  }


  DoctorLogin(){

     if(this.username=='' && this.password==''){
      this.show=true;
      setTimeout(()=>{    //<<<---    using ()=> syntax
       this.show = false;
  }, 2000);
    
     }
    
    else {
    this.http.get('/doctors').subscribe(data => {
      this.doctors=data;
     console.log(this.doctors);
      for(let doctor of this.doctors){
     console.log(doctor['username']);
     console.log(doctor['password']);
      
      if(doctor['username']==this.username && doctor['password']==this.password){
        
         let idD = doctor['_id'];
         this.exId.changeMessage(idD);
         console.log(idD);

        this.router.navigate(['/dashboard',{id:idD}]).then(nav => {
    console.log(nav); // true if navigation is successful
  }, err => {
    console.log(err) // when there's an error
  });
      }
      
      
      else
      
        {
        console.log('False');
        
       // let snackBarRef =this._snackBar.open('Wrong Username or Password !');
        this.show=true;
       setTimeout(()=>{    //<<<---    using ()=> syntax
        this.show = false;
   }, 2000);
     
     

      
      }
    
      
      
      }
   

    });

  }
    

  }

}
