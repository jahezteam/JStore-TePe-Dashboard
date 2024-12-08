import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { color } from '../../Models/color';
import { colorPermissions } from '../../Models/colorPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { permission } from '../../../permissions/Models/permission';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.scss'],

  providers: [ValidateService, DialogService, MessageService]
})
export class UpdateColorComponent implements OnInit, OnDestroy {
  colorpermissions = colorPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  form: color = {
    id: 0,
    nameAr: '',
    nameEn: '',
    code:''

  };
  permissions: any;
  constructor(private validationService: ValidateService, private primengConfig: PrimeNGConfig,
    public dialogService: DialogService, public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, private messageService: MessageService,
    private pickList: PickListService, private auth: AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }

  }
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  registerForm() {
    // console.log(this.config)
    this.form = {
      id: this.config.data?.id,
      nameAr: this.config.data?.nameAr,
      nameEn: this.config.data?.nameEn,
      code: this.config.data?.code


    };
    this.validationService.registerForm(["nameAr",'nameEn','code']);

    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status)
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
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }


}

