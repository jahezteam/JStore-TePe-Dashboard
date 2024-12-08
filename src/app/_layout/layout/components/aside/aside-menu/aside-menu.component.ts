import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { AuthenticationService } from '../../../../../modules/auth/services/authentication.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
 // appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor(private authService: AuthenticationService) { }
  activeDropdown: string | null = null;

  toggleDropdown(dropdownName: string): void {
    this.activeDropdown = this.activeDropdown === dropdownName ? null : dropdownName;
  }
  ngOnInit(): void { }
  isAuth(per: string) {
    return this.authService.isAuthorized(per);
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
}
