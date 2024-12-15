import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { productFeature } from '../../Models/product';
import { picklist } from 'app/pages/shared-module/Models/pickList';

@Component({
  selector: 'app-create-productColor',
  templateUrl: './create-productFeature.component.html',
  styleUrls: ['./create-productFeature.component.scss'],
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateProductFeatureComponent implements OnInit, OnDestroy {
  valid = false;
  featureType: picklist[] = [] as picklist[];
  features: picklist[] = [];
  selectedFeature: picklist = {} as picklist;
  selectedFeatureType: picklist = {} as picklist;
  form: productFeature = {
    id: 0,
    price: 0,
    quantity: 0,
    featureId: '',
    images: [],
  };
  selectedImages: (File | string)[] = [];
  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
    private changeDetection: ChangeDetectorRef,
  ) {}
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnInit(): void {
    this.registerForm();
    this.getFeatureType();
  }
  getFeatureType() {
    this.pickList.getFeatureTypes().subscribe((res) => {
      this.featureType = res;
    });
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  registerForm() {
    this.form = {
      id: 0,
      price: 0,
      quantity: 0,
      featureId: '',
      images: [],
    };
    this.validationService.registerForm(['price', 'quantity', 'featureId']);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  handleImages(files: (File | string)[]): void {
    this.selectedImages = files;
  }
  handleSelectFeatureType(event: any) {
    this.selectedFeatureType = event.value;
    this.features =
      this.featureType.find((x) => x.id === this.selectedFeatureType.id)
        ?.data || [];
    console.log(this.features);
  }
  onInputValidation(isValid: boolean): boolean {
    console.log('Are the inputs valid?', isValid);
    return isValid;
  }
  getValidation() {
    return !this.valid;
  }
  submit() {
    this.form.images = this.selectedImages;
    this.form.featureId = this.selectedFeature.id;
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }
  imagePath: any;
  urls: imageType[] = [] as imageType[];
}

export interface imageType {
  name: string;
  url: any;
  file: any;
}
