import { Injectable } from '@angular/core';
import {Video} from './video';
import {VideosObj} from './video';
import {GlobalVars} from '../globalVars';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'RxJS/Rx';
@Injectable()
export class VideoService {


  constructor(private http: Http) { }

  getVideos(paramsObj: ParamsData):Observable<VideosObj>{
    //return this.http.get('/assets/test/test.video.json').map(res=>res.json());
    let params = new URLSearchParams();
     params.set('orderBy', paramsObj.orderBy);
     params.set('order', paramsObj.order);
    return this.http.get(GlobalVars.apiBase+'videos/page/'+paramsObj.pageNumber, { search: params }).map(res=>res.json());
  }
  
}
interface ParamsData{
    pageNumber: number,
    orderBy: string,
    order: string
}
