import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { IdentityService } from '../service/identity.service';

@Injectable()
export class AuthActivator implements CanActivate {
  constructor(private identityService: IdentityService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      if (this.identityService.authorised(route)) return true;
      else {
        console.log('Not authorised');
        this.router.navigate(['/login']);
        return false;
      }
    }
    catch (error) {
      console.error(error);
      return false;
    }
  }
}
