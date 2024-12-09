import { Component } from '@angular/core';
import { FeatureTypePermissions } from '../../Modals/feature-type-permissions';
import { FeatureType } from '../../Modals/feature-type';
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

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateComponent {
  featureTypePermissions = FeatureTypePermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  form: FeatureType = {
    id: 0,
    nameAr: '',
    nameEn: '',
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
    this.registerForm();
    this.primengConfig.ripple = true;
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  registerForm() {
    console.log(this.config.data?.nameEn)
    this.form = {
      id: this.config.data?.id,
      nameEn: this.config.data?.nameEn,
      nameAr: this.config.data?.nameAr,
    };

    this.validationService.registerForm(['nameAr', 'nameEn']);

    this.validationService.validStatus.subscribe(
      (status) => {
        this.valid = status
      },
    );
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

  protected readonly FeatureTypePermissions = FeatureTypePermissions;
}
