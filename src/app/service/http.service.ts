import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusyService } from '../service/busy.service';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private busyService: BusyService) {}

  public get(url: string, data: any = null, headers: any = null): Promise<any> {
    let query = '';

    if (data) {
      for (const item in data) {
        if (data.hasOwnProperty(item) && data[item]) {
          if (query) query += '&';
          query += item + '=' + data[item];
        }
      }

      if (query) {
        if (url.indexOf('?') > -1) query = '&' + query;
        else query = '?' + query;
      }
    }

    return this.request(url + query, 'GET', headers, null);
  }

  public post(url: string, data: any = null, headers: any = null): Promise<any> {
    return this.request(url, 'POST', headers, data);
  }

  public put(url: string, data: any = null, headers: any = null): Promise<any> {
    return this.request(url, 'PUT', headers, data);
  }

  public delete(url: string, headers: any = null): Promise<any> {
    return this.request(url, 'DELETE', null, headers);
  }

  public request(url: string, method: string, headers: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const
        hdrs = headers ? new HttpHeaders(headers) : null;

      const req = new HttpRequest(method, url, data, hdrs ? {headers: hdrs} : null);

      this.busyService.show();

      this.http.request(req)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              const result = (typeof event.body === 'object') ? event.body : {};

              this.busyService.hide();

              if (result.success) resolve(result);
              else reject(result);
          }

        }, (event: HttpErrorResponse) => {
          let error = null;

          if (event.error && event.error.message) error = event.error;
          else error = {message: event.message};

          this.busyService.hide();

          console.error(error);
          reject(error);
        });
    });
  }
}
