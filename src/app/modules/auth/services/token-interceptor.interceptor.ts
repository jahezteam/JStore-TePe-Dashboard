import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }
  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getToken();

    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
