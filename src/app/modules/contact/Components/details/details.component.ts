import { Component } from '@angular/core';
import { Contact, ContactPermissions } from '../../Models/contact';
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
  contactPermissions = ContactPermissions;
  allPermissions: allPermissions = new allPermissions();
  form: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    content: '',
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
      firstName: this.config.data?.firstName,
      lastName: this.config.data?.lastName,
      mobile: this.config.data?.mobile,
      email: this.config.data?.email,
      content: this.config.data?.content,
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

  protected readonly ContactPermissions = ContactPermissions;
}
