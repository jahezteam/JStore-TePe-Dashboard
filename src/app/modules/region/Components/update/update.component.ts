import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RegionPermissions } from '../../Models/regionPermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Region } from '../../Models/region';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateComponent {
  regionPermissions = RegionPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  form: Region = {
    id: 0,
    name: '',
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
    this.form = {
      id: this.config.data?.id,
      nameEn: this.config.data?.nameEn,
      name: this.config.data?.name,
    };

    this.validationService.registerForm(['name', 'nameEn']);

    this.validationService.validStatus.subscribe((status) => {
      this.valid = status;
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
}
