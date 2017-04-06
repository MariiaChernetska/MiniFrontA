import { Component, OnInit } from '@angular/core';

import {VideoService} from './video.service';
import {Video} from './video';
import {VideosObj} from './video';
import {GlobalVars} from '../shared/globalVars';
import {Subscription} from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  providers:[VideoService]
})
export class MainPageComponent implements OnInit {
  
  videosObj: VideosObj;

  pageNum: number;
  orderBy: OrderType;
  order: OrderDirection;
    
  pagesArray: Array<number>;
  from: number;
  to: number;
  showPagination = false;
    
    
    
  constructor(private videoService: VideoService) {
     this.videosObj = new VideosObj();

   }
  apiHostIn = GlobalVars.apiHost;
  ngOnInit() {
     this.sortByDate();    
  }
  
  loadData(){
      let paramsObj = new ParamsData();
      switch(this.orderBy){
        case OrderType.Date: 
              paramsObj.orderBy = "date";
              break;
        case OrderType.Rating:
              paramsObj.orderBy = "rate";
              break;
      }
       switch(this.order){
        case OrderDirection.Ascending: 
              paramsObj.order = "asc";
              break;
        case OrderDirection.Descending:
              paramsObj.order = "desc";
              break;
      }
      
      
      paramsObj.pageNumber = this.pageNum;
      this.videoService.getVideos(paramsObj).subscribe(res=>{
        this.videosObj = res;
        
        let from = res.pageNum-res.pageNum%10;
        this.from = ((res.pageNum%10) == 0 ? from-10 : from)+1;
        this.to =this.from+9;
        if(this.to>res.pagesAmount){
          this.to = res.pagesAmount;
        }
        
        this.pagesArray = new Array<number>();
        for(let i = this.from; i <= this.to; i++){
          this.pagesArray.push(i);
        }

        
        if(res.pagesAmount>1){
            this.showPagination = true;
        }
      });
  }

  sortByRating(){
    this.pageNum = 1;
      if(this.orderBy == OrderType.Rating){
          this.order = this.order == OrderDirection.Ascending ? OrderDirection.Descending : OrderDirection.Ascending;
      }
      else{
        this.orderBy = OrderType.Rating;
        this.order = OrderDirection.Descending;
      }
      this.loadData();
  }
   sortByDate(){
    this.pageNum = 1;
    
        if(this.orderBy == OrderType.Date){
          this.order = this.order == OrderDirection.Ascending ? OrderDirection.Descending : OrderDirection.Ascending;
      }
      else{
        this.orderBy = OrderType.Date;
        this.order = OrderDirection.Descending;
      }
      this.loadData();
  }
  setNum(num: number){
    this.pageNum = num;
    this.loadData();
  }
}
class ParamsData{
    pageNumber: number;
    orderBy: string;
    order: string;
}
enum OrderType{
  Rating,
  Date
}
enum OrderDirection{
    Ascending,
    Descending
}
