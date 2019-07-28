import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IdentityService } from './identity.service';

import { environment } from '../../environments/environment';

import * as io from 'socket.io-client';

@Injectable()

export class SocketService {
  private socket = null;
  public onEvent = new BehaviorSubject<any>(null);

  constructor(private identityService: IdentityService) {
  }

  public start(): void {
    if (!this.socket) {
      const
        url = environment.socket_host,
        options = {
          path: environment.socket_path,
          reconnect: true,
          /*extraHeaders: {
            Authorization: 'bearer ' + this.identityService.token
          },*/
          query: {
            authorization: this.identityService.token
          }
        };

      console.log(url);
      console.log(options);
      this.socket = io(url, options);

      this.socket.on('connect', () => console.log('Connected to tracking server'));
      this.socket.on('disconnect', () => console.log('Disconnected from tracking server'));
      this.socket.on('error', error => console.error(error));
      this.socket.on('event', event => this.onEvent.next(event));
    }
  }

  public stop(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public send(event) {
    this.socket.emit('event', event);
  }

  public get running(): boolean {
    return !!this.socket;
  }
}
