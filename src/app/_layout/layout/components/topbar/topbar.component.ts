import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../../../../modules/users/Services/users.service';
import { AuthenticationService } from '../../../../modules/auth/services/authentication.service';
import { user } from '../../../../modules/users/Models/user';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';

  constructor(private layout: LayoutService, private service: UsersService,
    private auth: AuthenticationService, private changeDetection: ChangeDetectorRef,
    private router: Router) { }
  user$!: Observable<user>;
  url: any;

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();

    this.headerLeft = this.layout.getProp('header.left') as string;

    this.user$.subscribe(x => {
      this.service.getImage(x.userName).subscribe((res: any) => {
        if (res) {
          const mimeType = res.type;
          if (mimeType.match(/image\/*/) == null) {
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onload = (_event) => {
            this.url = reader.result;
            this.changeDetection.detectChanges();
          }
        }
        else {
          // this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
        }
      });
    });

  }
  getCardItems(): number {

    return this.auth.getKey("Packages")?.length;
  }
  routeToCart() {
    if (this.auth.isAuthenticated()) { this.router.navigateByUrl('package/cart'); } else { this.router.navigateByUrl('cart'); }

  }
}
