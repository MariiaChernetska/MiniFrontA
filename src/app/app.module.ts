import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RatingModule} from 'ngx-rating';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {Routing} from './app.routing';
import {ReactiveFormsModule} from '@angular/forms'
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {RegService} from './reg/reg.service'
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';


import { RegComponent } from './reg/reg.component';
import { OfficeComponent } from './office/office.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { PlayerComponent } from './player/player.component';
import {CanActivateGuardService} from './can-activate-guard.service';
import { NotFoundComponent } from './not-found/not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegComponent,
    OfficeComponent,
    TestComponent,
    LoginComponent,
    PlayerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    Routing,
    ReactiveFormsModule,
    RatingModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, CookieService, RegService, CanActivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
