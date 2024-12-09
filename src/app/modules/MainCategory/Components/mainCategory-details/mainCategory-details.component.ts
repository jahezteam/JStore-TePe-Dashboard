import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { mainCategory } from '../../Models/mainCategory';
import { mainCategoryPermissions } from '../../Models/mainCategoryPermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-mainCategory-details',
  templateUrl: './mainCategory-details.component.html',
  styleUrls: ['./mainCategory-details.component.scss']
})
export class MainCategoryDetailsComponent implements OnInit, OnDestroy {
  valid = false;
  mainCategoryPermissions = mainCategoryPermissions;
  allPermissions: allPermissions = new allPermissions();

  form: mainCategory = {
    id: 0,
    name: '',
    description: ''
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
      name: this.config.data?.name,
      description: this.config.data?.description
    };
  }
  submit() {
    this.ref.close(null);
  }
  cancel() {
    this.ref.close(null);
  }
}

