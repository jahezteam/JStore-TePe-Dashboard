import { Component } from '@angular/core';
import { Branch, BranchPermissions } from '../../Models/branch';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { picklist } from '../../../../pages/shared-module/Models/pickList';

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
  regions: dropdown[] = [] as dropdown[];
  cities: picklist[] = [] as picklist[];
  selectedRegion: dropdown | undefined = {} as picklist;
  selectedCity: picklist | any[] = {} as picklist;
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
    this.getRegions();
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
