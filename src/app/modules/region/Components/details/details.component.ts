import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Region } from '../../Models/region';
import { RegionPermissions } from '../../Models/regionPermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  regionPermissions = RegionPermissions;
  allPermissions: allPermissions = new allPermissions();

  form: Region = {
    id: 0,
    name: '',
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
      name: this.config.data?.name,
      nameEn: this.config.data?.nameEn,
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
