import { Component } from '@angular/core';
import { ProductPermissions } from '../../Models/productPermissions';
import { picklist } from '../../../../pages/shared-module/Models/pickList';
import { productFeature } from '../../Models/product';
import { PrimeNGConfig, SharedModule } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MultiImageUploadComponent } from '../../../../pages/shared-module/components/multi-image-upload/multi-image-upload.component';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-feature-details',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    MultiImageUploadComponent,
    SharedModule,
    SharedModuleModule,
    ToastModule,
  ],
  templateUrl: './product-feature-details.component.html',
  styleUrl: './product-feature-details.component.scss',
})
export class ProductFeatureDetailsComponent {
  valid = false;
  ProductPermission = ProductPermissions;
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
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
    private pickList: PickListService,
  ) {}
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
    this.getFeatureType(this.config.data?.featureId);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
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
  registerForm() {
    this.form = {
      id: this.config.data?.id,
      price: this.config.data?.price,
      quantity: this.config.data?.quantity,
      featureId: this.config.data?.featureId,
      images: this.config.data?.images,
    };
  }
  submit() {
    this.ref.close(null);
  }
  cancel() {
    this.ref.close(null);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
