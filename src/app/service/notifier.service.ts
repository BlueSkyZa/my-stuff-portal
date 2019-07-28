import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class NotifierService {

  constructor(private toastrService: ToastrService, private translateService: TranslateService) { }

  private translate(title: string, message: string, data?: any): Promise<{message: string; title: string}> {
    return new Promise((resolve, reject) => {
      const list = [];

      if (title && title.indexOf('.') > 0) list.push(title);
      if (message && message.indexOf('.') > 0) list.push(message);

      if (list.length > 0) {
        this.translateService.get(list, data).subscribe(result => {
          resolve({title: result[title] || title, message: result[message] || message});
        }, error => {
          reject(error);
        });
      }
      else {
        resolve({title, message});
      }
    });
  }

  public success(title: string, message: string, data?: any) {
    this.translate(title, message, data)
      .then(result => this.toastrService.success(result.message, result.title))
      .catch(error => console.error(error));
  }

  public error(title: string, message: string, data?: any) {
    this.translate(title, message, data)
      .then(result => this.toastrService.error(result.message, result.title))
      .catch(error => console.error(error));
  }

  public warning(title: string, message: string, data?: any) {
    this.translate(title, message, data)
      .then(result => this.toastrService.warning(result.message, result.title))
      .catch(error => console.error(error));
  }

  public info(title: string, message: string, data?: any) {
    this.translate(title, message, data)
      .then(result => this.toastrService.info(result.message, result.title))
      .catch(error => console.error(error));
  }
}
