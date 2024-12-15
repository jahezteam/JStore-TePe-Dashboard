import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { coupon } from '../../../Coupon/Models/Coupon';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { ProductPermissions } from '../../Models/productPermissions';
import { product, productFeature } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { picklist } from 'app/pages/shared-module/Models/pickList';
import { environment } from '../../../../../environments/environment';
import { ProductFeatureDetailsComponent } from '../product-feature-details/product-feature-details.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  valid = false;
  ProductPermission = ProductPermissions;

  id: any = 0;
  sub: any = 0;
  searchValue: string = '';
  mainCategories: picklist[] = [] as picklist[];
  categories: picklist[] = [] as picklist[];
  selectedCategory: picklist | undefined = {} as picklist;
  selectedMainCategory: picklist | undefined = {} as picklist;
  pFeatures: productFeature[] = [] as productFeature[];
  features: picklist[] = [] as picklist[];
  ref: DynamicDialogRef = new DynamicDialogRef();

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
    features: [],
    isActive: true,
    isDeleted: false,
  };
  constructor(
    private service: ProductService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private picklistService: PickListService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.sub = this.route.snapshot.paramMap.get('sub');
    if (this.sub == null) {
      this.sub = 0;
    }
    this.picklistService.getFeatures().subscribe((res: any) => {
      this.features = res.items;
    });
    this.searchValue = this.route.snapshot.paramMap.get('searchValue')!;
    this.getData(this.id);
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
  imagePreview(files: any) {
    if (files == null) {
      return '';
    }
    if (files.path) {
      return environment.imageUrl + files.path;
    }
    return URL.createObjectURL(files);
  }
  getFeatureName(id: string) {
    if (this.features && this.features.length > 0) {
      return this.features?.filter((x) => x.id == id)[0]?.nameAr;
    }
    return '';
  }
  safeUrl: any = '';
  getData(id: any) {
    this.service.getById(id).subscribe((res: any) => {
      this.getMainCategories(res.categoryId);
      if (res) {
        this.form = res;
        this.pFeatures = res.features;
        // this.loadImage(this.form.code);
        this.changeDetection.detectChanges();
        this.primengConfig.ripple = true;
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
  CheckCouponExpire(coupon: coupon) {
    let date = new Date(Date.now());
    let coupondate = new Date(coupon.expiryDate);
    if (coupondate < date) {
      return true;
    } else {
      return false;
    }
  }
  url: any = '';
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
  split(str: string) {
    return str.split(/\r?\n/);
  }
  routrToList() {
    this.router.navigateByUrl('/product/list/' + this.searchValue);
  }
  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
  formItems: string[] = [];
  openDetailsPopup(item: productFeature) {
    this.ref = this.dialogService.open(ProductFeatureDetailsComponent, {
      header: 'Product Feature Details',
      width: '75%',
      contentStyle: { 'max-height': '750px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  isInRole(role: string) {
    return this.auth.isInRole(role);
  }
}
