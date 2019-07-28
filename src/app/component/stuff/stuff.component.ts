import { Component, OnDestroy } from '@angular/core';
import { Data, DataEvent } from '../tree-view/tree-view.component';
import { Subscription } from 'rxjs';

import { StuffService } from '../../service/stuff.service';
import { SocketService } from '../../service/socket.service';
import { NotifierService } from '../../service/notifier.service';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnDestroy {

  private subscriptions = new Subscription();
  private data: Data[];

  constructor(private stuffService: StuffService, private socketService: SocketService, private notifierService: NotifierService) {
    this.stuffService.get()
      .then(result => {
        this.data = result.data;
        this.socketService.start();

        this.subscriptions.add(this.socketService.onEvent.subscribe(event => {
          if (!event) return;

          switch (event.action) {
            case 'create': return this.create(event.data);
            case 'update': return this.update(event.data);
            case 'remove': return this.remove(event.data);
            default: return Promise.reject({message: 'Action unrecognised'});
          }
        }));

      })
      .catch(error => notifierService.error('Load Failed', error.message));
  }

  ngOnDestroy() {
    this.socketService.stop();
  }

  private dataChange(event: DataEvent) {
    if (!event) return;

    function postData(stuffService) {
      switch (event.action) {
        case 'create': return stuffService.post(event.data);
        case 'update': return stuffService.put(event.data);
        case 'remove': return stuffService.delete(event.data);
        default: return Promise.reject({message: 'Action unrecognised'});
      }
    }

    postData(this.stuffService)
      .then(() => {
        console.log('DATA CHANGED');
        console.log(event);
        this.socketService.send(event);
      })
      .catch(error => this.notifierService.error('Post Failed', error.message));
  }

  private create(data: Data) {
    console.log('REMOTE UPDATE');
    console.log(data);

    this.data.push(data);
    this.data = this.data.slice(); // force angular to trigger and update

    this.notifierService.success('Remote Create', 'Record created: ' + data.name);
  }

  private update(data: Data) {
    const currentData = this.data.find(item => item.id === data.id);
    if (!currentData) return this.notifierService.warning('Remote Update Failed', 'Record not found');

    console.log('REMOTE UPDATE');
    console.log(data);

    currentData.parentId = data.parentId;
    currentData.name = data.name;

    this.notifierService.success('Remote Update', 'Record updated: ' + data.name);
  }

  private remove(data: Data) {
    const index = this.data.findIndex(item => item.id === data.id);
    if (index === -1) return this.notifierService.warning('Remote Delete Failed', 'Record not found');

    console.log('REMOTE DELETE');
    console.log(data);

    this.data.splice(index, 1);
    this.data = this.data.slice(); // force angular to trigger and update

    this.notifierService.success('Remote Delete', 'Record deleted: ' + data.name);
  }
}
