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
      .catch(error => notifierService.error('Load Failed', error));
  }

  private dataChange(event: DataEvent) {
    // TODO: Send data to api
    console.log('DATA CHANGED');
    console.log(event);
  }

  // TODO: subscribe to api data changes from third parties

}
