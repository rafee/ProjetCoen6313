import { Component, OnInit } from '@angular/core';
import {ExchangeIdService} from '../../pages/dashboard/exchange-id.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
message:any;
doctor={};
  constructor(private exId: ExchangeIdService, private http: HttpClient) { }

  ngOnInit() {

    this.exId.currentMessage.subscribe(message => this.message = message);

    this.http.get('/doctors/'+this.message).subscribe(data=>{
        this.doctor=data;
    });
  }

}
