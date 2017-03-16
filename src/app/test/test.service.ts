import { Injectable } from '@angular/core';
import {HttpInterceptor} from '../reg/interceptor.service'

@Injectable()
export class TestService {

  constructor(private interceptor: HttpInterceptor) { }
 getTest(){
      this.interceptor.get('/test/guy').map(res=>res.text()).subscribe((resp)=>{console.log(resp)});
    //this.http.get('http://localhost:6885/api/test/guy').map(res=>res.text()).subscribe((resp)=>{console.log(resp)})
  }
}
