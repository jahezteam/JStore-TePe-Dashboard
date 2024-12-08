import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../../modules/auth/services/authentication.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void { }

  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }
  openLinkInNewWindow(url: string) {
    window.open(url, '_blank');
  }
  getroute() {
    let view = this.authService.getKey("view");
    if (view == null) {
      return "list";
    }
    else {
      return view.toString();
    }
  }
  isAuth(per: string) {
    return this.authService.isAuthorized(per);
  }


}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
};
