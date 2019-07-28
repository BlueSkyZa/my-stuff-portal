import { Injectable } from '@angular/core';

import { IdentityService } from './identity.service';
import { HttpService } from './http.service';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService, private identityService: IdentityService) { }

  public authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // this.identityService.set({username: 'Chris', role: 'admin'}, 'DUMMY');
      // return resolve();

      this.httpService.get(environment.api_url + 'auth/authenticate', null,
        {authorization: 'basic ' + btoa(username + ':' + password)})
        .then((result: any) => {
          console.log(result);
          this.identityService.set(result.data.user, result.data.token);
          return resolve(result.data);
        })
        .catch((error: any) => {
          this.identityService.clear();
          reject(error);
        });
    });
  }
}
