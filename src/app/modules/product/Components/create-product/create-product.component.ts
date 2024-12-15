import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { ProductPermissions } from '../../Models/productPermissions';
import { product, productFeature } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { picklist } from 'app/pages/shared-module/Models/pickList';
import { CreateProductFeatureComponent } from '../create-productFeature/create-productFeature.component';
import { CategorysService } from '../../../Category/Services/category.service';
import { environment } from '../../../../../environments/environment';
import { UpdateProductFeatureComponent } from '../update-productFeature/update-productFeature.component';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],

  providers: [
    ValidateService,
    MessageService,
    DialogService,
    ConfirmationService,
  ],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  valid = false;
  ProductPermission = ProductPermissions;
  mainCategories: picklist[] = [] as picklist[];
  categories: picklist[] = [] as picklist[];
  selectedCategory: picklist = {} as picklist;
  selectedMainCategory: picklist = {} as picklist;
  features: picklist[] = [] as picklist[];
  form: product = {
    id: 0,
    titleAr: '',
    titleEn: '',
    longDescriptionAr: '',
    longDescriptionEn: '',
    shortDescriptionAr: '',
    shortDescriptionEn: '',
    modelNumber: '',
    categoryId: '',
    features: [] as productFeature[],
    isActive: true,
    isDeleted: false,
  };
  urlCache: Map<File[], string> = new Map();
  ref: DynamicDialogRef = new DynamicDialogRef();
  pFeatures: productFeature[] = [] as productFeature[];
  imagePath: number = 0;
  url: any;
  file: any = null;
  constructor(
    private validationService: ValidateService,
    private service: ProductService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private picklistService: PickListService,
    private categoryService: CategorysService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService,
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
    this.getMainCategories();
    this.picklistService.getFeatures().subscribe((res: any) => {
      this.features = res.items;
    });
  }
  getFeatureName(id: string) {
    if (this.features && this.features.length > 0) {
      return this.features?.filter((x) => x.id == id)[0]?.nameAr;
    }
    return '';
  }
  imagePreview(files: any) {
    if (files.length === 0) {
      return '';
    }
    if (files instanceof String) {
      return files;
    }
    return URL.createObjectURL(files);
  }
  routrToList() {
    this.router.navigateByUrl('/product/list/*');
  }
  registerForm() {
    this.validationService.registerForm([
      'titleAr',
      'titleEn',
      'modelNumber',
      'shortDescriptionAr',
      'shortDescriptionEn',
      'longDescriptionAr',
      'longDescriptionEn',
    ]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }
  openAddPopup() {
    this.ref = this.dialogService.open(CreateProductFeatureComponent, {
      header: 'Create Product Feature',
      width: '75%',
      contentStyle: { 'max-height': '750px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: productFeature) => {
      if (item != null) {
        this.pFeatures.push(item);
        this.form.features.push(item);
        // this.service.post(item).subscribe((res: any) => {
        //   if (res) {
        //     this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Color Created Succesfully' });
        //     this.ngOnInit();
        //   }
        //   else {
        //     this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
        //   }
        // });

        this.changeDetection.detectChanges();
      }
    });
  }
  openUpdatePopup(item: productFeature) {
    this.ref = this.dialogService.open(UpdateProductFeatureComponent, {
      header: 'Update Product Feature',
      width: '75%',
      contentStyle: { 'max-height': '750px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.ref.onClose.subscribe((item: productFeature) => {
      if (item != null) {
        this.pFeatures.push(item);
        this.form.features.push(item);
        // this.service.post(item).subscribe((res: any) => {
        //   if (res) {
        //     this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Color Created Succesfully' });
        //     this.ngOnInit();
        //   }
        //   else {
        //     this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
        //   }
        // });
        this.changeDetection.detectChanges();
      }
    });
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  getValidation() {
    return !this.valid;
  }
  getMainCategories() {
    this.picklistService.getMainCategories().subscribe((res: any) => {
      this.mainCategories = res;
    });
  }
  handleSelectMainCategory(event: any) {
    this.picklistService.getMainCategories().subscribe((res: any) => {
      this.categories = res.find((x: any) => x.id == event.value.id).data;
    });
  }
  deleteFeature(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this color?',
      accept: () => {
        this.pFeatures.splice(index, 1);
        this.changeDetection.detectChanges();
      },
    });
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    // formData.append('file', fileToUpload, fileToUpload.name);
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      this.changeDetection.detectChanges();
    };
    this.file = fileToUpload;
  };
  submit() {
    this.form.categoryId = this.selectedCategory.id;
    this.service.post(this.form).subscribe((res: any) => {
      if (res) {
        console.log(this.form);
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          summary: 'Success',
          detail: 'Product Created Succesfully',
        });
        this.clearInputs();
        this.registerForm();
      } else {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'Error',
          detail: 'Error occured Please contact system adminstrator',
        });
      }
    });
  }
  clearInputs() {
    this.valid = false;
    this.selectedCategory = {} as picklist;
    this.selectedMainCategory = {} as picklist;
    this.categories = [] as picklist[];
    this.mainCategories = [] as picklist[];
    this.imagePath = 0;
    this.url = '';
    this.file = null;
    this.pFeatures = [] as productFeature[];

    this.form = {
      id: 0,
      titleAr: '',
      titleEn: '',
      longDescriptionAr: '',
      longDescriptionEn: '',
      shortDescriptionAr: '',
      shortDescriptionEn: '',
      modelNumber: '',
      categoryId: '',
      features: [],
      isActive: true,
      isDeleted: false,
    };
    this.changeDetection.detectChanges();
    this.ngOnInit();
  }
  reset() {
    this.clearInputs();
  }

  protected readonly environment = environment;
}
