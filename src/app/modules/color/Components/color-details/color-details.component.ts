import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { color } from '../../Models/color';
import { colorPermissions } from '../../Models/colorPermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { permission } from '../../../permissions/Models/permission';

@Component({
  selector: 'app-color-details',
  templateUrl: './color-details.component.html',
  styleUrls: ['./color-details.component.scss']
})
export class ColorDetailsComponent implements OnInit, OnDestroy {
  valid = false;
  colorPermissions = colorPermissions;
  allPermissions: allPermissions = new allPermissions();

  form: color = {
    id: 0,
    nameAr: '',
    nameEn: '',
    code: ''


  };

  constructor(private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
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
      nameEn: this.config.data?.nameEn,
      code: this.config.data?.code

    };
  }
  submit() {
    this.ref.close(null);
  }
  cancel() {
    this.ref.close(null);
  }
}

