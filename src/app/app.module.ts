import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../../src/environments/environment';
// #fake-start#
import { NgxPermissionsModule } from 'ngx-permissions';
import { LoaderInterceptor } from './pages/shared-module/Loader/loader-interceptor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TokenInterceptorInterceptor } from './modules/auth/services/token-interceptor.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIntlTelephoneInputModule } from "ngx-intl-telephone-input";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './modules/auth/services/authentication.service';


// #fake-end#

// function appInitializer(authService: AuthenticationService) {
//   return () => {
//     return new Promise((resolve:any) => {
//       authService.getToken()!.subscribe().add(resolve);
//     });
//   };
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ProgressSpinnerModule,
    NgxIntlTelephoneInputModule,
    ClipboardModule,
    // #fake-start#
    // environment.isMockEnabled
    //   ? HttpClientInMemoryWebApiModule.forRoot(AuthenticationService, {
    //     passThruUnknownUrl: true,
    //     dataEncapsulation: false,
    //   })
    //   : [],
    // #fake-end#
    AppRoutingModule,
     NgbModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   multi: true,
    //   // deps: [AuthService],

    // },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
