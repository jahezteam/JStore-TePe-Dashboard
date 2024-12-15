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
  templateUrl: './update-productFeature.component.html',
  styleUrls: ['./update-productFeature.component.scss'],

  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateProductFeatureComponent implements OnInit, OnDestroy {
  valid = false;
  colors: picklist[] = [] as picklist[];
  featureType: picklist[] = [] as picklist[];
  features: picklist[] = [];
  selectedFeature: picklist = {} as picklist;
  selectedFeatureType: picklist = {} as picklist;
  selectedImages: (File | string)[] = [];
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
    this.getFeatureType(this.config.data?.featureId);
    // this.getFeatureType();
  }
  getFeatureType(id: any) {
    this.pickList.getFeatureTypes().subscribe((res) => {
      this.featureType = res;
      this.selectedFeatureType =
        this.featureType.find((item) => item.data?.find((x) => x.id == id)) ||
        ({} as picklist);
      this.features =
        res.find((x: any) => x.id === this.selectedFeatureType?.id)?.data ||
        ({} as picklist);
      this.selectedFeature =
        this.features.find((x) => x.id == id) || ({} as picklist);
    });
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
    this.selectedImages = this.config.data?.images;
    this.validationService.registerForm(['price', 'quantity']);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  onInputValidation(isValid: boolean): boolean {
    console.log('Are the inputs valid?', isValid);
    return isValid;
  }
  getValidation() {
    return !this.valid;
  }
  handleImages(files: (File | string)[]): void {
    this.selectedImages = files;
    this.form.images = files;
  }
  handleSelectFeatureType(event: any) {
    this.selectedFeatureType = event.value;
    this.features =
      this.featureType.find((x) => x.id === this.selectedFeatureType?.id)
        ?.data || [];
    console.log(this.features);
  }
  submit() {
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }
}
