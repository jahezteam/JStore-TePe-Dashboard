import { Component } from '@angular/core';
import { AboutPermissions, AboutUsFeacturers } from '../../../Models/about';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-details-feature',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './details-feature.component.html',
  styleUrl: './details-feature.component.scss',
})
export class DetailsFeatureComponent {
  valid = false;
  aboutPermissions = AboutPermissions;
  allPermissions: allPermissions = new allPermissions();
  form: AboutUsFeacturers = {
    id: 0,
    featurNameAr: '',
    featurNameEn: '',
    counter: 0,
    aboutUsId: 0,
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
      featurNameAr: this.config.data?.featurNameAr,
      featurNameEn: this.config.data?.featurNameEn,
      counter: this.config.data?.counter,
      aboutUsId: this.config.data?.aboutUsId,
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
