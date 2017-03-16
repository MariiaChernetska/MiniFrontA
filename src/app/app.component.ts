import { Component, OnInit, DoCheck } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {RegService} from './reg/reg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  isLoggedIn: boolean = false;

  constructor(private reg: RegService){}

  ngOnInit(){
    if(this.reg.isLoggedIn()){
      this.isLoggedIn = true;
    }
  }
  ngDoCheck(){
    if(this.reg.isLoggedIn()){
     this.isLoggedIn = true;
    
    }
    else{
      this.isLoggedIn = false;
    }
  }
  logOut(){
    this.reg.logOut();
  }
}
