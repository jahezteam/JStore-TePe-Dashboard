import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { Branch, BranchPermissions } from '../../Models/branch';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import * as L from 'leaflet';
import { picklist } from '../../../../pages/shared-module/Models/pickList';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateComponent {
  valid = false;
  BranchPermissions = BranchPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  form: Branch = {
    id: 0,
    name: '',
    nameEn: '',
    whatsApp: '',
    regionId: 0,
    cityId: 0,
    phone: '',
    email: '',
    mobile: '',
    address: '',
    addressEn: '',
    lat: 0,
    long: 0,
    isPrimary: false,
  };
  selectedCoordinates!: L.LatLng;
  latitude = 24.7136;
  longitude = 46.6753;
  regions: dropdown[] = [] as dropdown[];
  cities: picklist[] = [] as picklist[];
  selectedRegion: picklist = {} as picklist;
  selectedCity: picklist = {} as picklist;

  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
  ) {}

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
    this.getRegions();
  }

  onMapClick(coordinates: L.LatLng) {
    console.log(this.form);
    this.selectedCoordinates = coordinates;
    this.latitude = coordinates.lat;
    this.longitude = coordinates.lng;
    this.form.lat = coordinates.lat;
    this.form.long = coordinates.lng;
  }
  registerForm() {
    this.form = {
      id: 0,
      name: '',
      nameEn: '',
      whatsApp: '',
      regionId: 0,
      cityId: 0,
      phone: '',
      email: '',
      mobile: '',
      address: '',
      addressEn: '',
      lat: 0,
      long: 0,
      isPrimary: false,
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
  getRegions() {
    this.pickList.getRegions().subscribe((res) => {
      console.log(res);
      this.regions = res;
    });
  }
  handleSelectedRegion(event: any) {
    this.pickList.getRegions().subscribe((res) => {
      this.cities = res.find((x: any) => x.id == event.value.id).data;
    });
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  getValidation() {
    return !this.valid;
  }
  submit() {
    this.form.regionId = Number(this.selectedRegion.id);
    this.form.cityId = Number(this.selectedCity.id);
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
