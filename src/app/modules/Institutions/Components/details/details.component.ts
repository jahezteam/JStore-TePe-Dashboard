import { Component } from '@angular/core';
import { Institution, InstitutionPermissions } from "../../Models";
import { PrimeNGConfig } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthenticationService } from "../../../auth/services/authentication.service";
import { SharedModuleModule } from "../../../../pages/shared-module/shared-module.module";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  institutionPermissions = InstitutionPermissions;
  form: Institution = {
    id: 0,
    nameAr: '',
    nameEn: '',
    email: '',
    phone: '',
    locationAr: '',
    locationEn: '',
    descriptionAr: '',
    descriptionEn: '',
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
      nameEn: this.config.data?.nameEn,
      email: this.config.data?.email,
      phone: this.config.data?.phone,
      locationAr: this.config.data?.locationAr,
      locationEn: this.config.data?.locationEn,
      descriptionAr: this.config.data?.descriptionAr,
      descriptionEn: this.config.data?.descriptionEn,
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
