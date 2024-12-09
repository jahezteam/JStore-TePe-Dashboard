import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModuleModule } from "app/pages/shared-module/shared-module.module";

export const routes: Routes = [
  // {
  //   path: 'add',
  //   component: CreateProductComponent,
  //   canActivate: [PermissionGuard],
  //   data: { permission: ProductPermissions.CreateProduct },
  // },
  // {
  //   path: 'list/:searchValue',
  //   component: ProductListComponent,
  //   canActivate: [PermissionGuard],
  //   data: { permission: ProductPermissions.ProductList },
  //
  // },
  // {
  //   path: 'edit/:id/:searchValue',
  //   component: UpdateProductComponent,
  //   canActivate: [PermissionGuard],
  //   data: { permission: ProductPermissions.UpdateProduct },
  // },
  // {
  //   path: 'details/:id/:searchValue',
  //   component: ProductDetailsComponent,
  //   canActivate: [PermissionGuard],
  //   data: { permission: ProductPermissions.ProductDetails },
  // }


];
@NgModule({
  declarations: [
    // CreateProductComponent,
    // UpdateProductComponent,
    // ProductDetailsComponent,
    // ProductListComponent,
    // FilterProductComponent,CreateProductColorComponent,
    // UpdateProductColorComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class RegionModule { }
