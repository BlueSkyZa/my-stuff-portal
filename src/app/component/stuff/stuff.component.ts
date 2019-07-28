import { Component } from '@angular/core';
import { Data, DataEvent } from '../tree-view/tree-view.component';

import { StuffService } from '../../service/stuff.service';
import { NotifierService } from '../../service/notifier.service';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent {
  private data: Data[];

  constructor(private stuffService: StuffService, private notifierService: NotifierService) {
    this.stuffService.get()
      .then(result => this.data = result.data)
      .catch(error => notifierService.error('Load Failed', error.message));
  }

  private dataChange(event: DataEvent) {
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
      })
      .catch(error => this.notifierService.error('Post Failed', error.message));
  }

  // TODO: subscribe to api data changes from third parties

}
