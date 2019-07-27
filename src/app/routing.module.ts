import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthActivator } from './activator/auth.activator';

import { LoginComponent } from './component/login/login.component';
import { StuffComponent } from './component/stuff/stuff.component';
import { UserComponent } from './component/user/user.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthActivator] },

  { path: 'stuff', component: StuffComponent, canActivate: [AuthActivator] },
  { path: 'user', component: UserComponent, canActivate: [AuthActivator]},

  { path: '', component: HomeComponent, canActivate: [AuthActivator] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
