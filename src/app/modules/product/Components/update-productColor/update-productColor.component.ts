import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { productFeature } from '../../Models/product';
import { picklist } from 'app/pages/shared-module/Models/pickList';

@Component({
  selector: 'app-update-productColor',
  templateUrl: './update-productColor.component.html',
  styleUrls: ['./update-productColor.component.scss'],

  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateProductColorComponent implements OnInit, OnDestroy {
  valid = false;
  colors: picklist[] = [] as picklist[];
  selectedColor: picklist = {} as picklist;
  form: productFeature = {
    id: 0,
    price: 0,
    quantity: 0,
    featureId: '',
    images: [],
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
    this.form = {
      id: this.config.data?.id,
      price: this.config.data?.price,
      quantity: this.config.data?.quantity,
      featureId: this.config.data?.featureId,
      images: this.config.data?.images,
    };
    this.validationService.registerForm([
      'price',
      'quantity',
      'featureId',
      'images',
    ]);

    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
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
