import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { permission } from '../../Models/permission';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],

  providers:[ValidateService,DialogService]
})
export class CreatePermissionComponent implements OnInit , OnDestroy {
  valid=false;
  form: permission = {
    id:0,
    name:''

  };
  constructor(private validationService: ValidateService,private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,public ref:DynamicDialogRef) { }
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
      id:0,
      name:''

    };
    this.validationService.registerForm(["name"]);
    this.validationService.validStatus.subscribe(
        (status) => (this.valid = status)
      );
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

