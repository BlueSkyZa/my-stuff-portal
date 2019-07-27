import { Component } from '@angular/core';

import { IdentityService } from '../../service/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private identity: IdentityService) {
  }

}
