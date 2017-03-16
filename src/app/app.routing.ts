import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';

import { RegComponent } from './reg/reg.component';
import { OfficeComponent } from './office/office.component';
import { LoginComponent } from './login/login.component';
import { PlayerComponent } from './player/player.component';
import {CanActivateGuardService} from './can-activate-guard.service'
 import { NotFoundComponent } from './not-found/not-found.component';
import { TestComponent } from './test/test.component';


const APP_ROUTES: Routes = [
    {path: '', redirectTo:'mainpage', pathMatch: 'full'},
    {path: 'mainpage', component: MainPageComponent},
    {path: 'registration', component: RegComponent},
    {path: 'office', component: OfficeComponent, 
  canActivate: [
   
    CanActivateGuardService
  ]},
    {path: 'r', component: TestComponent},
    {path: 'login', component: LoginComponent},
    {path: 'player', component: PlayerComponent},
    { path: '**', component: NotFoundComponent }
]

export const Routing = RouterModule.forRoot(APP_ROUTES);
