import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { environment } from '../../../../../environments/environment';
import { UpdateProductFeatureComponent } from '../update-productFeature/update-productFeature.component';
import { ProductFeatureDetailsComponent } from '../product-feature-details/product-feature-details.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  providers: [
    ValidateService,
    MessageService,
    DialogService,
    ConfirmationService,
  ],
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  valid = false;
  ProductPermission = ProductPermissions;
  id: any = 0;
  searchValue: string = '';
  mainCategories: picklist[] = [] as picklist[];
  categories: picklist[] = [] as picklist[];
  selectedCategory: picklist | undefined = {} as picklist;
  selectedMainCategory: picklist | undefined = {} as picklist;
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
  features: picklist[] = [] as picklist[];
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
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.searchValue = this.route.snapshot.paramMap.get('searchValue')!;
    this.getData(this.id);
    this.picklistService.getFeatures().subscribe((res: any) => {
      this.features = res.items;
    });
    this.primengConfig.ripple = true;
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
    this.validInput();
  }

  getMainCategories(id: any) {
    this.picklistService.getMainCategories().subscribe((res: any) => {
      this.mainCategories = res;
      // this.id
      this.selectedMainCategory = this.mainCategories.find((item) =>
        item.data?.find((x) => x.id == id),
      );
      this.categories = res.find(
        (x: any) => x.id == this.selectedMainCategory?.id,
      ).data;
      this.selectedCategory = this.categories.find((x) => x.id == id);
    });
  }
  handleSelectMainCategory(event: any) {
    this.picklistService.getMainCategories().subscribe((res: any) => {
      this.categories = res.find((x: any) => x.id == event.value.id).data;
    });
  }

  deleteFeature(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Product Feature?',
      accept: () => {
        this.pFeatures.splice(index, 1);
        this.changeDetection.detectChanges();
      },
    });
  }
  getFeatureName(id: string) {
    if (this.features && this.features.length > 0) {
      return this.features?.filter((x) => x.id == id)[0]?.nameAr;
    }
    return '';
  }

  getData(id: any) {
    this.service.getById(id).subscribe((res: any) => {
      this.getMainCategories(res.categoryId);
      if (res) {
        this.form = res;
        this.pFeatures = res.features;
        this.registerForm();
        this.changeDetection.detectChanges();
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

  imagePreview(files: any) {
    if (files == null) {
      return '';
    }
    if (files.path) {
      return environment.imageUrl + files.path;
    }
    return URL.createObjectURL(files);
  }

  routeToList() {
    this.router.navigateByUrl('/product/list/' + this.searchValue);
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
        console.log('item', item);
        // this.pFeatures.push(item);
        // this.form.features.push(item);
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
  openDetailsPopup(item: productFeature) {
    this.ref = this.dialogService.open(ProductFeatureDetailsComponent, {
      header: 'Product Feature Details',
      width: '75%',
      contentStyle: { 'max-height': '750px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
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

    this.form = {
      id: 0,
      titleAr: '',
      titleEn: '',
      longDescriptionAr: '',
      longDescriptionEn: '',
      shortDescriptionAr: '',
      shortDescriptionEn: '',
      modelNumber: '',
      categoryId: '8',
      features: [],
      isActive: true,
      isDeleted: false,
    };
    this.changeDetection.detectChanges();
    this.ngOnInit();
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
  validInput() {
    Object.keys(this.form).forEach((i) => {
      this.isInputValid(i, true);
    });
  }
  submit() {
    this.service.update(this.form).subscribe((res: any) => {
      // this.service.update(this.form).subscribe(res=>{
      if (res) {
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          summary: 'Success',
          detail: 'Product Updated Successfully',
        });
      } else {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'Error',
          detail: 'Error occurred Please contact system adminstrator',
        });
      }
    });
  }
  reset() {
    this.clearInputs();
  }
}
