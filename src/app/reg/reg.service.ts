import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
import {GlobalVars} from '../shared/globalVars';

import {Headers} from '@angular/http';
import {RequestOptions} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

@Injectable()
export class RegService {
   success = ()=>{};
   fail = (error: LoginError)=>{};
   regSuccess = ()=>{};
   regFail = (error: RegError)=>{};
    
  constructor(private http: Http, private cookie: CookieService, private router: Router) { }
   
  sendRegData(regForm: Object){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 
      return  this.http.post(GlobalVars.apiBase+'/register', JSON.stringify(regForm), options).map(res => {res.text()}, 
      (error)=>{
        let er1:RegError = JSON.parse(error._body);
            this.regFail(er1);
           
      }
      );
  }

  logIn(loginObj){
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      let data = "username=" + loginObj.login + "&password=" + loginObj.password;
          
      this.http.post(GlobalVars.apiHost+'token', loginObj).map(res=>res.json()).subscribe((result)=>{
           this.cookie.putObject('authorizationData', { token: result.token, userName: result.userName });
            this.success();
         }, 
         (error)=>{
            let er:LoginError = JSON.parse(error._body);
            this.fail(er);
          
         });
     }
     logOut(){
       this.cookie.remove('authorizationData');
       this.router.navigate(['/mainpage']);
     }
     isLoggedIn = function () {
 
        let authData = this.cookie.getObject('authorizationData');
        if (authData && authData.token)  return true;
         return false;
    }
   

}
class LoginResult{
  constructor(success: boolean, message: string){
    this.success = success;
    this.message = message;
  }
  success: boolean;
  message: string;
}
class LoginError{
    message: string;
    modelState: {
      "user.Login": Array<string>,
      "user.Password": Array<string>
    }
}
export class RegError{
  message: string;
  modelState: {
    "model.Login": Array<string>,
    "model.FullName": Array<string>,
    "model.Password": Array<string>,
    "model.RepeatPassword": Array<string>
  }

}

//[disabled]="!registerForm.valid" 