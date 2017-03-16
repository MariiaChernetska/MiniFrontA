
import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';


@Injectable()
export class RouteGuard  {

  canActivate() {
    console.log('AuthGuard#canActivate called');
    return true;
  }

  
}
