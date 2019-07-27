import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (public translate: TranslateService) {
    const lang = window.navigator.language.split('-')[0];
    this.translate.setDefaultLang('en');
    this.translate.use(lang);
  }
}
