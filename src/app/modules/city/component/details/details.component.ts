import { Component } from '@angular/core';
import { CityPermissions } from '../../models/cityPermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { City } from '../../models/city';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  cityPermissions = CityPermissions;
  allPermissions: allPermissions = new allPermissions();
  form: City = {
    id: 0,
    name: '',
    nameEn: '',
    regionId: 0,
  };
  regions: dropdown[] = [] as dropdown[];
  selectedRegion: dropdown = {} as dropdown;
  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
    private pickList: PickListService,
  ) {}

  ngOnInit(): void {
    this.pickList.getRegions().subscribe((res) => {
      this.regions = res;
      this.registerForm();
      this.primengConfig.ripple = true;
    });
  }

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }

  registerForm() {
    this.form = {
      id: this.config.data?.id,
      name: this.config.data?.name,
      nameEn: this.config.data?.nameEn,
      regionId: this.config.data?.regionId,
    };

    let item = this.regions.filter((x) => x.id == this.config.data?.regionId);
    this.selectedRegion = item![0];
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
