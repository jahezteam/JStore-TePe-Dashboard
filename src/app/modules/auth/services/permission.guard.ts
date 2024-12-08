import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthenticationService,private router:Router,private permissionService:NgxPermissionsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((result) => {
        if (this.authService.isAuthorized(route?.data['permission'])) {
          //this.authService.loadUserData();
          result(true);
        } else {
          this.router.navigateByUrl("/error/404");
          result(false);
        }

   });

   //return this.permissionService.hasPermission(route?.data?.permission);

  }
}
