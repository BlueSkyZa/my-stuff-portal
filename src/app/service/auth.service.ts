import { Injectable } from '@angular/core';

import { IdentityService } from './identity.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private identityService: IdentityService) { }

  public authenticate(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.identityService.set({name: 'Chris', admin: true}, 'DUMMY');
      resolve();
    });
  }
}
