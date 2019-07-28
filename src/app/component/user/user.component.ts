import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { UserService } from '../../service/user.service';
import { NotifierService } from '../../service/notifier.service';

interface User {
  id: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private dataSource: MatTableDataSource<User>;
  private editing: string;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(private userService: UserService,  private notifierService: NotifierService) {
    this.userService.get()
      .then(result => {
        this.dataSource = new MatTableDataSource(result.data);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      })
      .catch(error => notifierService.error('Load Failed', error.message));
  }

  ngOnInit() {
  }

  private edit(user: User) {
    console.log('EDITING USER');
    console.log(user);

    this.editing = user.id;
  }

  private remove(user: User) {
    const index = this.dataSource.data.findIndex(data => data.id === user.id);
    if (index === -1) return;

    this.userService.delete(user)
      .then(() => {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = this.dataSource.data.slice(0); // force table control to update

        console.log('REMOVE USER');
        console.log(user);
      })
      .catch(error => this.notifierService.error('Remove Failed', error.message));
  }

  private done(user: User) {
    function postUser(userService) {
      if (user.id === 'NEW') return userService.post(user);
      else return userService.put(user);
    }

    console.log('DONE EDITING');
    console.log(user);

    postUser( this.userService)
      .then(result => {
        if (user.id === 'NEW') {
          user.id = result.data.id;
          console.log('USER CREATED');
        }
        else
          console.log('USER UPDATE');

        console.log(user);
        this.editing = null;
      })
      .catch(error => this.notifierService.error('Post Failed', error.message));
  }

  private add() {
    this.dataSource.data.splice(0, 0, {id: 'NEW', username: '', password: ''});
    this.editing = 'NEW';
    this.dataSource.data = this.dataSource.data.slice(0); // force table control to update
  }

}
