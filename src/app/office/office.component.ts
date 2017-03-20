import { Component, OnInit } from '@angular/core';
import {OfficeService} from './office.service';
import {Video} from '../main-page/video';
import {GlobalVars} from '../globalVars';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Http,
 
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request,
  XHRBackend
} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';

var owlInstance;
declare var $;
declare var jQuery;
import {HttpInterceptor} from '../reg/interceptor.service';
@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
   providers: [OfficeService, {
    provide: HttpInterceptor,
    deps: [XHRBackend, RequestOptions, CookieService],
    useFactory: (backend, options, cookies, router) => {
      return new HttpInterceptor(backend, options, cookies, router);
    }}]
})
export class OfficeComponent implements OnInit {
    apiHostIn = GlobalVars.apiHost;
    pageNum = 1;
    videoLoadForm: FormGroup;
    usersVideos: Array<Video>;
    loadMore = true;
    error: string;
    videoForm: FormGroup;
    file: File;
    preloader: boolean = false;
    successMess: boolean = false;
  constructor(private officeService: OfficeService, private router: Router, private cookies: CookieService) {
       this.videoForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'descr': new FormControl('', Validators.required),
      'videoFile': new FormControl('', Validators.required),
    });

   }
  
  ngOnInit() {
    this.officeService.getUsersVideos(this.pageNum).subscribe((res)=>{
      this.usersVideos = res;
      if(this.usersVideos.length===4){
          this.loadMore = false;
      }
     console.log(res)
       setTimeout(() => owlL(), 0);
       this.pageNum++;
    },
    err=>{
        if(err.status==401){
        }
    });
     
    
  }
 loadAndAdd(){
   this.officeService.getUsersVideos(this.pageNum).subscribe((res)=>{
      
      let buf = this.usersVideos;
      owlInstance.owlCarousel('destroy');
      this.usersVideos = buf.concat(res);
      let position;

      (this.usersVideos.length%4==0)? position=this.usersVideos.length/4-1:position=Math.floor(this.usersVideos.length/4)-1;
       setTimeout(() => owlRefresh(position), 0);
      this.pageNum++;

       
    });
 }
loadOne(oneVideo){
    let buf = this.usersVideos;
     owlInstance.owlCarousel('destroy');
     this.usersVideos.unshift(oneVideo);
      let position = 0;
       setTimeout(() => owlRefresh(position), 0);
}
  sendVideo(){
    

      let mythis = this;
       // var data = new FormData(jQuery('form#hi')[0]);
        var data = new FormData();
            var file = $('form input[type=file]')[0].files[0];
           
            data.append('file',file);
             var title = $('form #title').val();
            var descr =  $('form #descr').val();
            data.append('title',  title);
             data.append('description', descr);
        
    let result;
    
    function printData(data){
        result = data
        console.log(data)
        mythis.loadOne(result)
         mythis.error  = ""
    }
    function printError(errorText){
        mythis.error = errorText
    }



    let authData:any = this.cookies.getObject('authorizationData');
    jQuery.ajax({
    url: GlobalVars.apiBase+'videos/videosave',
    beforeSend: function(request) { 
        request.setRequestHeader("Authorization", `Basic ${authData.token}`); 
        $('.loader').show();
    },

    data: data,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){
       $('.load-success').animate({'opacity': '1'}, 2000).animate({'opacity': '0'}, 2000);
       $('.loader').hide();
        $('form input[type=file]').val("");
         var title = $('form #title').val("");
            var descr =  $('form #descr').val("");
    
printData(data)
    }
        
    ,
    error: function(xhr) {
          printError(xhr.responseJSON.message);
 $('.loader').hide();
}
});
  
  }
Send(){
     var data = new FormData();
     data.append('file', this.file);
     data.append('title', this.videoForm.controls['title'].value);
     data.append('descr', this.videoForm.controls['descr'].value);
     this.officeService.postVideo(data).subscribe(res=>{
         console.log(res)
         this.successMess = true;

         
         setTimeout(()=>this.successMess=false,3000);
         this.preloader = false;
         this.loadOne(res);
    });
  }

  fileChanged(event) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
  }



}












function owlRefresh(length){
  //owlInstance.owlCarousel('destroy');
 
  owlInstance = $('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})
owlInstance.trigger('to.owl.carousel', [length]);


}

function owlL(){
   owlInstance = $('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
});







}
