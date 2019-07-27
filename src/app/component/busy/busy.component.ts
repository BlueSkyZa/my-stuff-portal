import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusyService } from '../../service/busy.service';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.css']
})
export class BusyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private visible: boolean;

  constructor(private busyService: BusyService) { }

  ngOnInit() {
    this.subscription = this.busyService.visible
      .subscribe(visible => {
        this.visible = visible;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
