import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { FeaturePermissions } from '../../Modals/feature-permissions';
import { FeatureType } from '../../../feature-type/Modals/feature-type';
import { Feature } from '../../Modals/feature';
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
  featurePermissions = FeaturePermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  form: Feature = {
    id: 0,
    nameAr: '',
    nameEn: '',
    code: '',
    featureTypeId: 0,
  };
  permissions: any;
  featureTypes: dropdown[] = [] as dropdown[];
  selectedFeatureTypes: dropdown = {} as dropdown;
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
    this.pickList.getFeatureTypes().subscribe((res) => {
      this.featureTypes = res.map((x: any) => ({
        id: x.id,
        name: x.name,
        nameEn: x.nameEn,
      }));
      this.registerForm();
      this.primengConfig.ripple = true;
    });
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  registerForm() {
    console.log(this.config);
    this.form = {
      id: this.config.data?.id,
      nameEn: this.config.data?.nameEn,
      nameAr: this.config.data?.nameAr,
      code: this.config.data?.code,
      featureTypeId: this.config.data?.featureTypeId,
    };
    this.validationService.registerForm(['nameAr', 'nameEn']);

    let item = this.featureTypes.filter(
      (x) => x.id == this.config.data?.featureTypeId,
    );
    this.selectedFeatureTypes = item![0];

    this.validationService.validStatus.subscribe((status) => {
      this.valid = this.valid = status;
    });
    this.validInput();
  }
  private validInput() {
    Object.keys(this.form).forEach((i) => {
      this.isInputValid(i, true);
    });
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
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
