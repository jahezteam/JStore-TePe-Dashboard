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
import { picklist } from 'app/pages/shared-module/Models/pickList';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';

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
    regionId: 0,
    cityId: 0,
    whatsApp: '',
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
  regions: dropdown[] = [] as dropdown[];
  cities: picklist[] = [] as picklist[];
  selectedRegion: dropdown | undefined = {} as picklist;
  selectedCity: picklist | any[] = {} as picklist;
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
    this.getRegions();
    this.registerForm();
    this.primengConfig.ripple = true;
  }
  getRegions() {
    this.pickList.getRegions().subscribe((res) => {
      this.regions = res;

      this.selectedRegion = this.regions.find((id) => {
        return this.form.regionId == Number(id.id);
      });
      this.handleSelectedRegion({ value: this.selectedRegion });
      // @ts-ignore
      this.selectedCity = this.selectedRegion.data.find((id: any) => {
        return this.form.cityId == Number(id.id);
      });
    });
  }
  handleSelectedRegion(event: any) {
    this.pickList.getRegions().subscribe((res) => {
      this.cities = res.find((x: any) => x.id == event.value.id).data;
    });
  }
  registerForm() {
    this.form = {
      id: this.config.data.id,
      name: this.config.data.name,
      nameEn: this.config.data.nameEn,
      regionId: this.config.data.regionId,
      cityId: this.config.data.cityId,
      whatsApp: this.config.data.whatsApp,
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
      'phone',
      'email',
      'mobile',
      'address',
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
