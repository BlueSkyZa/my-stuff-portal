import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BusyService {
  private refCount = 0;
  private start = null;
  private subject = new Subject<boolean>();
  public visible = this.subject.asObservable();

  constructor() { }

  public show() {
    this.refCount++;
    console.log('BUSY:' + this.refCount);
    if (this.refCount === 1) {
      this.start = new Date().getTime();
      this.subject.next(true);
    }
  }

  public hide() {
    this.refCount--;
    console.log('BUSY:' + this.refCount);
    if (this.refCount < 0) this.refCount = 0;

    if (this.refCount === 0 ) {
      console.log('TIME: ' + ((new Date().getTime() - this.start) / 1000).toFixed(2) + ' seconds');
      this.subject.next(false);
    }
  }

}
