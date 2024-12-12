import { Component } from '@angular/core';
import { Branch, BranchPermissions } from '../../Models/branch';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateComponent {
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
  permissions: any;
  selectedCoordinates!: L.LatLng;
  latitude = this.form.lat;
  longitude = this.form.long;
  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }

  registerForm() {
    this.form = {
      id: this.config.data.id,
      name: this.config.data.name,
      nameEn: this.config.data.nameEn,
      unifiedNumber: this.config.data.unifiedNumber,
      fax: this.config.data.fax,
      phone: this.config.data.phone,
      email: this.config.data.email,
      mobile: this.config.data.mobile,
      address: this.config.data.address,
      addressEn: this.config.data.addressEn,
      lat: this.config.data.lat,
      long: this.config.data.long,
      isPrimary: this.config.data.isPrimary,
    };
    this.validationService.registerForm([
      'name',
      'nameEn',
      'unifiedNumber',
      'fax',
      'phone',
      'email',
      'mobile',
      'address',
      'addressEn',
    ]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }
  onMapClick(coordinates: L.LatLng) {
    console.log(this.form);
    this.selectedCoordinates = coordinates;
    this.latitude = coordinates.lat;
    this.longitude = coordinates.lng;
    this.form.lat = coordinates.lat;
    this.form.long = coordinates.lng;
  }

  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  private validInput() {
    Object.keys(this.form).forEach((i) => {
      this.isInputValid(i, true);
    });
  }

  getValidation() {
    return !this.valid;
  }
  submit() {
    this.ref.close(this.form);
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
