import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { permission } from '../../../permissions/Models/permission';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';
import { productColor } from '../../Models/product';
import { picklist } from 'app/pages/shared-module/Models/pickList';

@Component({
  selector: 'app-update-productColor',
  templateUrl: './update-productColor.component.html',
  styleUrls: ['./update-productColor.component.scss'],

  providers: [ValidateService, DialogService, MessageService]
})
export class UpdateProductColorComponent implements OnInit, OnDestroy {
  valid = false;
  colors:picklist[] =[] as picklist[];
  selectedColor:picklist={} as picklist;
  form: productColor = {
    id: 0,
    colorId: '',
    imageName: [],
    price:0,
    quantity:0,
    unitPriceAr:'',
    unitPriceEn:''
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
      imageName: this.config.data?.imageName,
      colorId: this.config.data?.colorId,
      price: this.config.data?.price,
      quantity: this.config.data?.quantity,
      unitPriceAr: this.config.data?.unitPriceAr,
      unitPriceEn: this.config.data?.unitPriceEn
    };
    this.validationService.registerForm(["unitPriceEn",'unitPriceAr'
      ,'quantity','price','colorId']);

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

