import { Component } from '@angular/core';
import { CityPermissions } from '../../models/cityPermissions';
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
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateComponent {
  cityPermissions = CityPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  selectedRegion: dropdown = {} as dropdown;
  regions: dropdown[] = [] as dropdown[];
  form: any = {
    id: 0,
    name: '',
    nameEn: '',
    regionId: 0,
  };
  permissions: any;
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
    this.pickList.getRegions().subscribe((res) => {
      this.regions = res;
      this.registerForm();
      this.primengConfig.ripple = true;
    });
  }
  handleRegionChange(event: any) {
    this.form.regionId = event.value.id;
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }

  registerForm() {
    this.form = {
      id: this.config.data?.id,
      nameEn: this.config.data?.nameEn,
      name: this.config.data?.name,
      regionId: this.config.data?.regionId,
    };

    this.validationService.registerForm(['name', 'nameEn', 'regionId']);

    this.validationService.validStatus.subscribe((status) => {
      this.valid = status;
    });
    let item = this.regions.filter((x) => x.id == this.config.data?.regionId);
    this.selectedRegion = item![0];
  }

  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }

  getValidation() {
    return !this.valid;
  }
  submit() {
    console.log(this.form);
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
