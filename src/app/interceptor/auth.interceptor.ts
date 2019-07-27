import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IdentityService } from '../service/identity.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private identityService: IdentityService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const
      token = this.identityService.token;

    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }
    else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 402) return;
          this.router.navigate(['login']);
        }
      }));
  }
}
