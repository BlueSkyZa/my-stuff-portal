import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private data = {
    user: null,
    token: null
  };

  constructor() { }

  public set(user: any, token: string) {
    this.data.user = user;
    this.data.token = token;

    console.log('USER');
    console.log(this.data);
  }

  public authorised(route: ActivatedRouteSnapshot) {
    if (route.url.length === 0) return false;

    const path = route.url[0].path;

    if (path.indexOf('/user') > 0 ) return this.administrator;
    else return !!this.authenticated;
  }

  public get authenticated() {
    return !!this.data.user;
  }

  public get administrator() {
    return !!(this.data.user && this.data.user.role === 'admin');
  }

  public get token() {
    return this.data.token;
  }

  public get role() {
    return this.data.user && this.data.user.role;
  }

  public clear() {
    this.data.user = null;
    this.data.token = null;
  }
}
