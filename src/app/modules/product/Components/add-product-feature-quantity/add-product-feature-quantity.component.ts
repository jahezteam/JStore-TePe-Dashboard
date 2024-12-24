import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { ProductPermissions } from '../../Models/productPermissions';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgForOf } from '@angular/common';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-add-product-feature-quantity',
  standalone: true,
  imports: [SharedModuleModule, NgForOf, ReactiveFormsModule],
  templateUrl: './add-product-feature-quantity.component.html',
  styleUrl: './add-product-feature-quantity.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class AddProductFeatureQuantityComponent {
  productPermissions = ProductPermissions;
  addQuantityForm!: FormGroup;
  features: any[] = [];

  featureType: dropdown[] = [] as dropdown[];
  constructor(
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private auth: AuthenticationService,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private pickList: PickListService,
    private service: ProductService,
  ) {
    this.addQuantityForm = this.fb.group({
      data: this.fb.array([]),
    });
  }

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  ngOnInit(): void {
    this.service.getById(this.config.data.id).subscribe((res: any) => {
      this.features = res.features;
      this.registerForm();
    });
    this.pickList.getFeatureTypes().subscribe((res: any) => {
      this.featureType = res;
    });
  }
  get productFeatures(): FormArray {
    return this.addQuantityForm.get('data') as FormArray;
  }
  registerForm() {
    this.features.forEach((element: any) => {
      this.productFeatures.push(
        this.fb.group({
          id: element.id,
          name: [
            {
              value: this.getFeatureName(element.featureId),
              disabled: true,
            },
          ],
          quantaty: 0,
        }),
      );
    });
  }
  getFeatureName(id: any) {
    return this.featureType
      .flatMap((item) => item.data)
      .find((dataItem) => dataItem?.id === id)?.name;
  }
  onSubmit() {
    if (this.addQuantityForm.invalid) {
      return;
    }
    this.ref.close(this.addQuantityForm.value);
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
