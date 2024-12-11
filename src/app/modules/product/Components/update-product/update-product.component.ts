import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig, } from 'primeng/api';
import { DialogService, DynamicDialogRef, } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { ProductPermissions } from '../../Models/productPermissions';
import { product, productFeature } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { picklist } from 'app/pages/shared-module/Models/pickList';
import { CreateProductFeatureComponent } from '../create-productFeature/create-productFeature.component';

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
  selectedCategory: picklist = {} as picklist;
  selectedMainCategory: picklist = {} as picklist;
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
  featuresTypes: picklist[] = [] as picklist[];
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
    this.getFeaturesTypes();
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
  getFeaturesTypes() {
    this.picklistService.getFeatureTypes().subscribe((res: any) => {
      this.featuresTypes = res;
    });
  }
  getFeatureName(id: string) {

    if (this.featuresTypes.length > 0) {
      return this.featuresTypes.filter((x) => x.id == id)[0].name;

    }
    return '';
  }
  getData(id: any) {
    this.service.getById(id).subscribe((res: any) => {
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
  loadImage(code: string) {
    this.service.getImage(code).subscribe((res: any) => {
      if (res) {
        const mimeType = res.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (_event) => {
          this.url = reader.result;
          this.changeDetection.detectChanges();
        };
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
  routeToList() {
    this.router.navigateByUrl('/product/list/' + this.searchValue);
  }
  openAddPopup() {
    this.ref = this.dialogService.open(CreateProductFeatureComponent, {
      header: 'Create Color',
      width: '75%',
      contentStyle: { 'max-height': '750px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: productFeature) => {
      if (item != null) {
        this.pFeatures.push(item);
        console.log(item);
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
    const formData = new FormData();
    formData.append('command', JSON.stringify(this.form));
    if (this.file !== null) formData.append('file', this.file, this.file.name);
    this.service.updateFormData(formData).subscribe((res: any) => {
      // this.service.update(this.form).subscribe(res=>{
      if (res) {
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          summary: 'Success',
          detail: 'Product Updated Succesfully',
        });
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
  reset() {
    this.clearInputs();
  }
}
