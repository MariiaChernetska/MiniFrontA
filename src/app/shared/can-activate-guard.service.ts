import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RegService } from '../reg/reg.service';

@Injectable()
export class CanActivateGuardService implements CanActivate {

  constructor(private regService: RegService) {}

  canActivate() {
    return this.regService.isLoggedIn();
  }
}
