import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class NotifierService {

  constructor(private toastrService: ToastrService, private translateService: TranslateService) { }

  public success(title: string, message: string, data?: any) {
    this.translateService.get([title, message], data).subscribe(result => {
      this.toastrService.success(result[message], result[title]);
    });
  }

  public error(title: string, message: string, translate?: boolean, data?: any) {
    this.translateService.get([title, message], data).subscribe(result => {
      this.toastrService.error(result[message], result[title]);
    });
  }

  public warning(title: string, message: string, translate?: boolean, data?: any) {
    this.translateService.get([title, message], data).subscribe(result => {
      this.toastrService.warning(result[message], result[title]);
    });
  }

  public info(title: string, message: string, translate?: boolean, data?: any) {
    this.translateService.get([title, message], data).subscribe(result => {
      this.toastrService.info(result[message], result[title]);
    });
  }
}
