import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { user } from '../../../../../../modules/users/Models/user';
import { environment } from '../../../../../../../environments/environment';
import { AuthenticationService } from '../../../../../../modules/auth/services/authentication.service';
import { ChangePasswordComponent } from '../../../../../../modules/users/Components/change-password/change-password.component';
import { changePassword } from '../../../../../../modules/users/Models/changePassword';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
  providers:[MessageService,DialogService]
})
export class UserInnerComponent implements OnInit, OnDestroy {
  // @HostBinding('class')
  // class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  // @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language!: LanguageFlag;
  user$!: Observable<user>;
  adminData=environment.SuperAdminData;
  langs = languages;
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthenticationService,
    private translationService: TranslationService,
    public dialogService: DialogService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() {
    this.auth.logout();
  }
  routeToProfile(){
    //this.router.navigateByUrl("/users/details/"+this.auth.currentUserSubject.value.id);
    this.router.navigateByUrl("/users/Profile/"+this.auth.currentUserSubject.value.id);

  }
  routeToHome(){
    //this.router.navigateByUrl("/users/details/"+this.auth.currentUserSubject.value.id);
    this.router.navigateByUrl("/home");

  }
  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }
  ref!: DynamicDialogRef;
  openChangePasswoedPopup(){
    this.ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '50%',
      contentStyle: {"max-height": "550px", "overflow": "auto"},
      baseZIndex: 10000
  });

  this.ref.onClose.subscribe((item: changePassword) =>{

  });
  }
  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];
