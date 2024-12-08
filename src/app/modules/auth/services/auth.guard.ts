import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  // constructor(private authService: AuthenticationService) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const currentUser = this.authService.currentUser;
  //   if (currentUser) {
  //     // logged in so return true
  //     return true;
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.authService.logout();
  //   return false;
  // }
  constructor(private authService: AuthenticationService,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((result) => {
        if (this.authService.isAuthenticated()) {
          this.authService.loadUserData().then(x=>{
          result(true);
          });
        } else {
          this.router.navigateByUrl("/auth");
          result(false);
        }
    });
  }
}
