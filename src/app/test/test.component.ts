import { Component, OnInit } from '@angular/core';
import {TestService} from './test.service'
import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
import {HttpInterceptor} from '../reg/interceptor.service';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

import {
  Http,
 
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request,
  XHRBackend
} from '@angular/http';
declare var jQuery;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [{
    provide: HttpInterceptor,
    deps: [XHRBackend, RequestOptions, CookieService],
    useFactory: (backend, options, cookies, router) => {
      return new HttpInterceptor(backend, options, cookies, router);
    }}]
})
export class TestComponent implements OnInit {
  way: string;
  constructor(private interceptor: HttpInterceptor) { }
   getTest(){
      this.interceptor.get('test/guy').map(res=>res.text()).subscribe((resp)=>{console.log(resp)});

   }

  ngOnInit() {
  }
 
  Send(){
        var data = new FormData(jQuery('form')[0]);
        jQuery.ajax({
    url: 'http://localhost:6885/api/Upload',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){
        alert(data);
    }
});
  }

}
