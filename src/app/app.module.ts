import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { RoutingModule } from './routing.module';

import { AuthActivator } from './activator/auth.activator';
import { AuthInterceptor } from './interceptor/auth.interceptor';

import { AuthService } from './service/auth.service';
import { BusyService } from './service/busy.service';
import { HttpService } from './service/http.service';
import { IdentityService } from './service/identity.service';
import { NotifierService } from './service/notifier.service';
import { StuffService } from './service/stuff.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { StuffComponent } from './component/stuff/stuff.component';
import { UserComponent } from './component/user/user.component';
import { BusyComponent } from './component/busy/busy.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { TreeViewComponent } from './component/tree-view/tree-view.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StuffComponent,
    UserComponent,
    BusyComponent,
    HeaderComponent,
    HomeComponent,
    TreeViewComponent,
    AutoFocusDirective
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      autoDismiss: false,
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      positionClass: 'toast-bottom-right',
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    HttpClient,
    AuthActivator,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    BusyService,
    HttpService,
    IdentityService,
    NotifierService,
    StuffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
