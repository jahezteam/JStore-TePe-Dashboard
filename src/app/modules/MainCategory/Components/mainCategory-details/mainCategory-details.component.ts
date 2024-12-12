import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { mainCategory } from '../../Models/mainCategory';
import { mainCategoryPermissions } from '../../Models/mainCategoryPermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-mainCategory-details',
  templateUrl: './mainCategory-details.component.html',
  styleUrls: ['./mainCategory-details.component.scss'],
})
export class MainCategoryDetailsComponent implements OnInit, OnDestroy {
  valid = false;
  mainCategoryPermissions = mainCategoryPermissions;
  allPermissions: allPermissions = new allPermissions();

  form: mainCategory = {
    id: 0,
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    icon: '',
    image: '',
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
  ) {}
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
      descriptionAr: this.config.data?.descriptionAr,
      descriptionEn: this.config.data?.descriptionEn,
      icon: this.config.data?.icon,
      image: environment.imageUrl + this.config.data?.image.path,
    };
  }
  submit() {
    this.ref.close(null);
  }
  cancel() {
    this.ref.close(null);
  }
}
