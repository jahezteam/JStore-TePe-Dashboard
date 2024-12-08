import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { UsersModule } from '../users/users.module';
import { SignOutOthersRequestComponent } from './components/sign-out-others-request/sign-out-others-request.component';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { NgxIntlTelephoneInputModule } from "ngx-intl-telephone-input";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    AuthComponent,
    SignOutOthersRequestComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModuleModule,
    UsersModule,
    NgxIntlTelephoneInputModule    
  ]
})
export class AuthModule { }
