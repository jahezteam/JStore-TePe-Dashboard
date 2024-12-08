import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { changeUserPassword } from '../../Models/changePassword';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.scss'],
  providers:[ValidateService,DialogService,MessageService]

})
export class ChangeUserPasswordComponent implements OnInit , OnDestroy {
  valid=false;

  form: changeUserPassword = {
 newPassword:'',
 confirmedPassword:''

  };
  constructor(private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref:DynamicDialogRef,
    private messageService:MessageService,

    private auth: AuthenticationService
    ) { }
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
    this.validationService.registerForm(["newPassword","confirmedPassword"]);
    this.validationService.validStatus.subscribe(
        (status) => (this.valid = status)
      );
  }
  passwordMatched:boolean=false;
  isInputValid(name: string, status: boolean) {
    if(name=='confirmedPassword')
    {
      if(this.form.newPassword==this.form.confirmedPassword)
      {
        this.passwordMatched=true;
        this.validationService.updateFormFlag(name, true);

      }
      else{
        this.passwordMatched=false;
        this.validationService.updateFormFlag(name, false);
      }
    }
    else
    this.validationService.updateFormFlag(name, status);
  }
  submit(){
    if (this.form!=null) {
      this.ref.close(this.form);
     }
  }
  cancel(){
    this.ref.close(null);
  }


}

