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
  selectedFeatureType: picklist = {} as picklist;
  form: productFeature = {
    id: 0,
    unitPriceAr: '',
    unitPriceEn: '',
    price: 0,
    quantity: 0,
    featureId: '',
  };
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
      unitPriceAr: '',
      unitPriceEn: '',
      price: 0,
      quantity: 0,
      featureId: '',
    };
    this.validationService.registerForm([
      'unitPriceAr',
      'unitPriceEn',
      'price',
      'quantity',
      'featureId',
    ]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  getValidation() {
    return !this.valid;
  }
  submit() {
    this.form.featureId = this.selectedFeatureType.id;
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }
  imagePath: any;
  urls: imageType[] = [] as imageType[];
  deleteImage(item: imageType) {
    this.urls.splice(this.urls.indexOf(item), 1);
  }
  uploadFiles = (files: any) => {
    if (files.length === 0) {
      return;
    }
    // formData.append('file', fileToUpload, fileToUpload.name);
    for (const file of files) {
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.urls.push({ name: file.name, url: reader.result, file: file });
        this.changeDetection.detectChanges();
      };
    }
  };
}

export interface imageType {
  name: string;
  url: any;
  file: any;
}