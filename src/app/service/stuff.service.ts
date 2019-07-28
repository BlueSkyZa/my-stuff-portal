import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor(private httpService: HttpService) { }

  public get() {
    return this.httpService.get(environment.api_url + 'stuff');
  }

  public post(data) {
    return this.httpService.post(environment.api_url + 'stuff', data);
  }

  public put(data) {
    return this.httpService.put(environment.api_url + 'stuff/' + data.id, data);
  }

  public delete(data) {
    return this.httpService.delete(environment.api_url + 'stuff/' + data.id, data);
  }
}
