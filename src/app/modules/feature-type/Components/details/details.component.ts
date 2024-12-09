import { Component } from '@angular/core';
import { FeatureTypePermissions } from '../../Modals/feature-type-permissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { FeatureType } from '../../Modals/feature-type';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  FeatureTypePermissions = FeatureTypePermissions;
  allPermissions: allPermissions = new allPermissions();

  form: FeatureType = {
    id: 0,
    nameAr: '',
    nameEn: '',
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
      nameAr: this.config.data?.nameAr,
      nameEn: this.config.data?.nameEn
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
