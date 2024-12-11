import { Component } from '@angular/core';
import { Newsletter, NewsletterPermissions } from '../../Models/newsletter';
import { allPermissions } from 'app/pages/shared-module/Models/Permissions';
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
  newsletterPermissions = NewsletterPermissions;
  allPermissions: allPermissions = new allPermissions();
  form: Newsletter = {
    id: 0,
    email: '',
    isActive: false,
    isDeleted: false,
    isSubScribe: false,
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
      email: this.config.data?.email,
      isActive: this.config.data?.isActive,
      isDeleted: this.config.data?.isDeleted,
      isSubScribe: this.config.data?.isSubScribe,
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
