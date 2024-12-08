import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { color } from '../../Models/color';
import { colorPermissions } from '../../Models/colorPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.scss'],
  providers:[ValidateService,DialogService,MessageService]
})
export class CreateColorComponent implements OnInit , OnDestroy {
  valid=false;
  colorPermissions=colorPermissions;

  form: color = {
    id:0,
    nameAr:'',
    nameEn:'',
    code:''


  };
  constructor(private validationService: ValidateService,private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,public ref:DynamicDialogRef,private messageService:MessageService,
    private pickList:PickListService,private auth :AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
  }

  }
  ngOnInit(): void {
    this.registerForm();
  }
  isAuth(per:string){
    return this.auth.isAuthorized(per);
  }
  registerForm(){
    this.form = {
      id:0,
      nameAr:'',
      nameEn:'',
      code:''

    };
    this.validationService.registerForm(["nameAr",'nameEn','code']);
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

