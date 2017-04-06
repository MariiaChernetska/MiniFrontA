import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {TestService} from './test.service'
import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
import {HttpInterceptor} from '../shared/interceptor.service';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {GlobalVars} from '../shared/globalVars'

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
  videoForm: FormGroup;
  file: File;
 

  constructor(private interceptor: HttpInterceptor) { 
    this.videoForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'descr': new FormControl('', Validators.required),
      'videoFile': new FormControl('', Validators.required),
    });


  }
   

  ngOnInit() {
  }
 

  Send(){
     var data = new FormData();
     data.append('file', this.file);
     data.append('title', this.videoForm.controls['title'].value);
     data.append('descr', this.videoForm.controls['descr'].value);
     this.interceptor.post('videos/videosave', data).map(res=>res.json()).subscribe(res=>console.log(res));
  }

  



  fileChanged(event) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
  }

}
