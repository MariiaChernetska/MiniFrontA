import { Injectable } from '@angular/core';
import {HttpInterceptor} from '../shared/interceptor.service'

import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
import {Video} from '../main-page/video';
import {GlobalVars} from '../shared/globalVars';

@Injectable()
export class OfficeService {

  constructor(private http: HttpInterceptor) { }
  
  getUsersVideos(numberP):Observable<Array<Video>>{
    return this.http.get('videos/office/page/'+numberP).map(res=>res.json());
  }
  postVideo(data){
        return this.http.post('videos/videosave', data).map(res=>res.json());

  }


}
