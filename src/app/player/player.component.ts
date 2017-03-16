import { Component, OnInit, DoCheck } from '@angular/core';
import {PlayerService} from './player.service';
import { ActivatedRoute }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {GlobalVars} from '../globalVars';
import {VideoPlayer} from './videoPlayer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import {RatingModule} from 'ngx-rating';
import {RegService} from '../reg/reg.service';
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request,
  XHRBackend
} from '@angular/http';
import {HttpInterceptor} from '../reg/interceptor.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [PlayerService, CookieService, RegService, {
    provide: HttpInterceptor,
    deps: [XHRBackend, RequestOptions, CookieService],
    useFactory: (backend, options, cookies, router) => {
      return new HttpInterceptor(backend, options, cookies, router);
    }}]
})
export class PlayerComponent implements OnInit, DoCheck {
  
  videoId: number;
  videoRes: VideoPlayer;
  apiHost: string;
  changeDetected: boolean;
   userName: string;
  commentForm: FormGroup;
  showCommentForm: boolean = false;
  authData: any;
  starsCount: number = 0;

  constructor(private playerService: PlayerService, 
              private route: ActivatedRoute,
              private cookies: CookieService, 
              private regService: RegService) {
  this.videoRes = new VideoPlayer();
  this.apiHost = GlobalVars.apiHost;
 this.commentForm = new FormGroup({
      'comment': new FormControl('', Validators.required)
    });
}
  ngDoCheck(){
    if(this.videoRes.path !== undefined){
      this.changeDetected = true;
    
    }
    else{
            this.changeDetected = false;
    }
  }
  ngOnInit() {
  this.route.queryParams.subscribe(params => {
  
      this.videoId = params['videoId'] || 0;
      this.playerService.getVideo(this.videoId).subscribe( res => {
        this.videoRes = res;         
        this.showCommentForm = (this.regService.isLoggedIn() && !this.videoRes.isCommented);
       console.log(this.videoRes);
      });
    });
    
  
  }
  onSubmit(){
    let commentSnd = {
      'comment': this.commentForm.controls['comment'].value,
      'rating': this.starsCount,
      'videoId': this.videoRes.id
    }
    this.playerService.postComment(commentSnd).subscribe(res=>{
      this.starsCount=0;
      this.commentForm.controls['comment'].setValue('');
      this.videoRes.ratings.unshift(res);
    })
    console.log(commentSnd)
  }




  
}

