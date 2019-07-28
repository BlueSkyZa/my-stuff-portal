import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

export interface DataEvent {
  data: Data;
  action: string;
}

export interface Data {
  id: string;
  parentId: string;
  name: string;
}

interface Node {
  data: Data;
  editing: boolean;
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: 'tree-view.component.html',
  styleUrls: ['tree-view.component.scss'],
})
export class TreeViewComponent {
  private treeControl = new FlatTreeControl<Node>(node => node.level, node => node.expandable);
  private treeFlattener = new MatTreeFlattener<Data, Node>(this.transformer.bind(this), this.getLevel, this.isExpandable,
    this.getChildren.bind(this));
  private dataSource: MatTreeFlatDataSource<Data, Node>;

  private editing: boolean;
  private savedName: string;

  private data: Data[];

  @Output()
    dataChange: EventEmitter<DataEvent> = new EventEmitter<DataEvent>();

  @Input('treeData')
  set treeData(value: Data[]) {
    if (value) {
      this.data = value;

      this.dataSource = new MatTreeFlatDataSource<Data, Node>(this.treeControl, this.treeFlattener);
      this.dataSource.data = this.data.filter(item => !item.parentId);
    }
    else {
      this.data = null;
      this.dataSource = null;
    }
  }

  constructor() {}

  private newId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0,
        // tslint:disable-next-line:no-bitwise
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private getLevel(node: Node) {
    return node.level;
  }
  private isExpandable(node: Node){
    return node.expandable;
  }
  private getChildren(data: Data) {
    return this.data.filter(item => item.parentId === data.id);
  }

  private transformer(data: Data, level: number) {
    // map data item to tree node
    return {
      data,
      editing: !data.name,
      expandable: !!this.data.find(item => item.parentId === data.id),
      level
    };
  }

  private rebuildTree(expanded = null) {
    // get expanded nodes
    if (!expanded) expanded = this.getExpanded();

    // re-build tree
    this.dataSource.data = this.data.filter(item => !item.parentId);

    // re-expanded nodes
    this.expandNodes(expanded);
  }

  private getVisible(expanded: Node[]): Node[] {
    // Get visible data items by converting expanded nodes and their children to data items
    const result = [];

    this.dataSource.data.forEach(function addExpandedChildren(data)  {
      result.push(data);
      const node = expanded.find(item => item.data.id === data.id);
      if (!node || !node.expandable) return;
      const children = this.data.filter(item => item.parentId === node.data.id);
      children.forEach(child => addExpandedChildren(child));
    });

    return result.map(item => this.treeControl.dataNodes.find(node => node.data.id === item.id));
  }

  private getExpanded(): Node[] {
    return this.treeControl.dataNodes.filter(node => this.treeControl.isExpandable(node) && this.treeControl.isExpanded(node));
  }

  private expandNodes(nodes: Node[]) {
    this.treeControl.dataNodes.forEach(node => {
      if (nodes.find(item => node.data.id === item.data.id) && this.treeControl.isExpandable(node))
        this.treeControl.expand(node);
    });
  }

  private drop(event: CdkDragDrop<string[]>) {
    // visible nodes based on what is expanded
    const expanded = this.getExpanded();
    const visible = this.getVisible(expanded);

     // node to move
    const nodeToInsert = event.item.data;

    // determine where to insert the node
    const nodeAtDest = visible[event.currentIndex];
    if (nodeAtDest.data.id === nodeToInsert.data.id) return;

    // Mode node by changing its parent
    nodeToInsert.data.parentId = nodeAtDest.data.parentId;

    // rebuild the tree to update its display
    this.rebuildTree(expanded);

    // send data change event
    this.dataChange.next({data: nodeToInsert.data, action: 'update'});
  }

  private addNode(event, node) {
    event.stopPropagation();

    console.log('ADDING TO NODE');
    console.log(node);

    // add new data item
    const data = {id: this.newId(), parentId: node.data.id, name: ''};
    this.data.push(data);
    node.expandable = true;
    this.treeControl.expand(node);

    console.log('NEW DATA');
    console.log(data);

    // rebuild the tree to update its display
    this.rebuildTree();

    // send data change event
    this.dataChange.next({data, action: 'create'});
  }

  private removeNode(event, node) {
    event.stopPropagation();

    console.log('REMOVING NODE');
    console.log(node);

    // remove data item
    const index = this.data.findIndex(data => data.id === node.data.id);
    if (index === -1) return;
    this.data.splice(index, 1);

    // rebuild the tree to update its display
    this.rebuildTree();

    // send data change event
    this.dataChange.next({data: node.data, action: 'remove'});
  }

  private editNode(event, node) {
    event.stopPropagation();
    this.savedName = node.data.name;
    node.editing = true;
    this.editing = true;

    console.log('EDITING NODE');
    console.log(node);
  }

  private doneEditing(event, node) {
    event.stopPropagation();
    node.editing = false;
    this.editing = false;

    console.log('DONE EDITING');

    // send data change event
    if (this.savedName !== node.data.name)
      this.dataChange.next({data: node.data, action: 'update'});
  }
}
