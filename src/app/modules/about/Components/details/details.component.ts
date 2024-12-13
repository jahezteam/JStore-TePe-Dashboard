import { Component } from '@angular/core';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { environment } from '../../../../../environments/environment';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { About, AboutPermissions } from '../../Models/about';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  aboutPermissions = AboutPermissions;
  form: About = {
    id: 0,
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    summaryAr: '',
    summaryEn: '',
    image: '',
  };
  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
  ) {}
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }

  registerForm() {
    this.form = {
      id: this.config.data?.id,
      titleEn: this.config.data?.titleEn,
      titleAr: this.config.data?.titleAr,
      descriptionEn: this.config.data?.descriptionEn,
      descriptionAr: this.config.data?.descriptionAr,
      summaryAr: this.config.data?.summaryAr,
      summaryEn: this.config.data?.summaryEn,
      image: environment.imageUrl + this.config.data?.image.path,
    };
  }
  submit() {
    this.ref.close(null);
  }

  cancel() {
    this.ref.close(null);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
