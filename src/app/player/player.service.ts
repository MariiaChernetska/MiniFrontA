import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {GlobalVars} from '../globalVars'
import { Observable } from 'RxJS/Rx';
import {VideoPlayer} from './videoPlayer';
import {HttpInterceptor} from '../reg/interceptor.service'

@Injectable()

export class PlayerService {

  constructor(private http: Http, private httpIntercept: HttpInterceptor) { }
  
  getVideo(id: number): Observable<VideoPlayer>{
    return this.httpIntercept.get('videos/player/'+ id).map(res => res.json());
  }
  postComment(data){
    return this.httpIntercept.post('videos/ratingsave', data).map(this.extractData)
  }
  private extractData(res: Response) {
    let body;
    if (res.text()) {
        body = res.json();
    }
    return body || {};
}

}
