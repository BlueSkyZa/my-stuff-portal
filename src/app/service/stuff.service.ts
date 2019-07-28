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
}
