import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCouponComponent } from './Components/create-coupon/create-coupon.component';
import { UpdateCouponComponent } from './Components/update-coupon/update-coupon.component';
import { CouponDetailsComponent } from './Components/coupon-details/coupon-details.component';
import { FilterCouponsComponent } from './Components/filter-coupons/filter-coupons.component';
import { RouterModule, Routes } from '@angular/router';
import { CouponListComponent } from './Components/coupon-list/coupon-list.component';
import { AssignPackagesToCouponComponent } from './Components/assign-packages-to-coupon/assign-packages-to-coupon.component';
import { RemovePackagesFromCouponComponent } from './Components/remove-packages-from-coupon/remove-packages-from-coupon.component';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateCouponComponent,
    // canActivate: [PermissionGuard],
    // data: { permission: packagesPermissions.CreatePackage },
  },
  {
    path: 'list',
    component: CouponListComponent,
    // canActivate: [PermissionGuard],
    // data: { permission: packagesPermissions.PackageList },

  },
  {
    path: 'edit/:id',
    component: UpdateCouponComponent,
    // canActivate: [PermissionGuard],
    // data: { permission: packagesPermissions.UpdatePackage },
  },
  {
    path: 'details/:id',
    component: CouponDetailsComponent,
    // canActivate: [PermissionGuard],
    // data: { permission: packagesPermissions.PackageDetails },
  },
  // {
  //   path: '',
  //   component: PackageDetailsComponent
  // },
  // {
  //   path: 'UserPackages/:type/:userId',
  //   component: StudentPackageListComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'allpackages',
  //   component: AllPackagesComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'payment/:amount',
  //   component: PaymentComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'cart',
  //   component: CartComponent,
  //   canActivate: [AuthGuard]
  // }

];

@NgModule({
  declarations: [
    CreateCouponComponent,
    UpdateCouponComponent,
    CouponDetailsComponent,
    FilterCouponsComponent,
    CouponListComponent,
    AssignPackagesToCouponComponent,
    RemovePackagesFromCouponComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class CouponModule { }
