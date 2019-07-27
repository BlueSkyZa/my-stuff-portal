import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../service/auth.service';
import { NotifierService } from '../../service/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService,
              private notifierService: NotifierService, public translate: TranslateService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(150), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    });
  }

  public onLogin() {
    try {
      this.authService.authenticate(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          this.notifierService.success('Login Success', 'Welcome to My Stuff');
          this.router.navigate(['home']);
        })
        .catch(error => {
          console.log(error);
          this.notifierService.error('Login Failed', error.message);
        });
    }
    catch (error) {
      console.log(error);
      this.notifierService.error('Login Failed', error.message);
    }
  }
}
