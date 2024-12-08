import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { permission } from '../../Models/permission';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';

@Component({
  selector: 'app-update-permission',
  templateUrl: './update-permission.component.html',
  styleUrls: ['./update-permission.component.scss'],
  providers:[ValidateService,DialogService]
})
export class UpdatePermissionComponent implements OnInit , OnDestroy {
  valid=false;
  form: permission = {
    id:0,
    name:''

  };
  constructor(private validationService: ValidateService,private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,public ref:DynamicDialogRef,public config: DynamicDialogConfig) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
  }

  }
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }

  registerForm(){
    this.form = {
      id:this.config.data?.id,
      name:this.config.data?.permissionName

    };
    this.validationService.registerForm(["permissionName"]);

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

  getValidation(){
    return !this.valid;
  }
  submit(){
    this.ref.close(this.form);
  }
  cancel(){
    this.ref.close(null);
  }


}

