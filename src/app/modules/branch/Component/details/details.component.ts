import { Component } from '@angular/core';
import { Branch, BranchPermissions } from '../../Models/branch';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  branchPermissions = BranchPermissions;
  allPermissions: allPermissions = new allPermissions();
  form: Branch = {
    id: 0,
    name: '',
    nameEn: '',
    unifiedNumber: '',
    fax: '',
    phone: '',
    email: '',
    mobile: '',
    address: '',
    addressEn: '',
    lat: 0,
    long: 0,
    isPrimary: false,
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
    private pickList: PickListService,
  ) {}

  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }

  registerForm() {
    this.form = {
      id: this.config.data?.id,
      name: this.config.data?.name,
      nameEn: this.config.data?.nameEn,
      unifiedNumber: this.config.data?.unifiedNumber,
      fax: this.config.data?.fax,
      phone: this.config.data?.phone,
      email: this.config.data?.email,
      mobile: this.config.data?.mobile,
      address: this.config.data?.address,
      addressEn: this.config.data?.addressEn,
      lat: this.config.data?.lat,
      long: this.config.data?.long,
      isPrimary: this.config.data?.isPrimary,
    };
  }

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
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

  protected readonly BranchPermissions = BranchPermissions;
}
