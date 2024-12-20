import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { FilterProductComponent } from './Components/filter-product/filter-product.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../auth/services/permission.guard';

import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { ProductPermissions } from './Models/productPermissions';
import { CreateProductFeatureComponent } from './Components/create-productFeature/create-productFeature.component';
import { UpdateProductFeatureComponent } from './Components/update-productFeature/update-productFeature.component';
import { MultiImageUploadComponent } from '../../pages/shared-module/components/multi-image-upload/multi-image-upload.component';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateProductComponent,
    canActivate: [PermissionGuard],
    data: { permission: ProductPermissions.CreateProduct },
  },
  {
    path: 'list/:searchValue',
    component: ProductListComponent,
    canActivate: [PermissionGuard],
    data: { permission: ProductPermissions.ProductList },
  },
  {
    path: 'edit/:id/:searchValue',
    component: UpdateProductComponent,
    canActivate: [PermissionGuard],
    data: { permission: ProductPermissions.UpdateProduct },
  },
  {
    path: 'details/:id/:searchValue',
    component: ProductDetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: ProductPermissions.ProductDetails },
  },
];
@NgModule({
  declarations: [
    CreateProductComponent,
    UpdateProductComponent,
    ProductDetailsComponent,
    ProductListComponent,
    FilterProductComponent,
    CreateProductFeatureComponent,
    UpdateProductFeatureComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    MultiImageUploadComponent,
  ],
})
export class ProductModule {}
