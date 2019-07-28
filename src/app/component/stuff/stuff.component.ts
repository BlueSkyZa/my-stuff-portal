import { Component } from '@angular/core';
import { Data, DataEvent } from '../tree-view/tree-view.component';

const TREE_DATA: Data[] = [
  { id: '0', name: 'My Stuff', parentId: null},
  { id: '1', name: 'Fruit', parentId: '0'},
  { id: '2', name: 'Apple', parentId: '1' },
  { id: '3', name: 'Banana', parentId: '1' },
  { id: '4', name: 'Fruit loops', parentId: '1' },
  { id: '5', name: 'Vegetables', parentId: '0'},
  { id: '6', name: 'Green', parentId: '5' },
  { id: '7', name: 'Broccoli', parentId: '6' },
  { id: '8', name: 'Brussel sprouts', parentId: '6' },
  { id: '9', name: 'Orange', parentId: '5'},
  { id: '10', name: 'Pumpkins', parentId: '9'},
  { id: '11', name: 'Carrots', parentId: '9'},
];

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent {
  private data: Data[];

  constructor() {
    // TODO: Get data from api
    this.data = TREE_DATA;
  }

  private dataChange(event: DataEvent) {
    // TODO: Send data to api
    console.log('DATA CHANGED');
    console.log(event);
  }

  // TODO: subscribe to api data changes from third parties

}
