import { Component } from '@angular/core';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { FeaturePermissions } from '../../Modals/feature-permissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { Feature } from '../../Modals/feature';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [ValidateService, DialogService, MessageService],

})
export class CreateComponent {
  valid = false;
  featureTypePermissions = FeaturePermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  featureTypes: dropdown[] = [] as dropdown[];
  selectedFeatureTypes:dropdown={} as dropdown;

  form: Feature = {
    id: 0,
    nameAr: '',
    nameEn: '',
    featureTypeId: 0,
    code: '',
  };
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
    this.pickList.getFeatureTypes().subscribe((res) => {
      this.featureTypes = res.map(
        (x:any) => ({ id: x.id, name: x.name , nameEn:x.nameEn} )
      )
      this.registerForm();
      this.primengConfig.ripple = true;
    })
  }

  registerForm() {
    this.form = {
      id: 0,
      nameAr: '',
      nameEn: '',
      featureTypeId: 0,
      code: '',
    };
    this.validationService.registerForm([
      'nameAr',
      'nameEn',
      'featureTypeId',
      'code',
    ]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }

  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  getValidation() {
    return !this.valid;
  }
  submit() {
    this.form.featureTypeId = Number(this.selectedFeatureTypes.id);
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

  protected readonly FeaturePermissions = FeaturePermissions;
}
