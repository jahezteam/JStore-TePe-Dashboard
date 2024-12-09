import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared-module/shared-module.module').then((m) => m.SharedModuleModule),
  },
  {
    path: 'permissions',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/permissions/permissions.module').then((m) => m.PermissionsModule),
  },
  {
    path: 'roles',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'mainCategory',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/MainCategory/mainCategory.module').then((m) => m.MainCategorysModule),
  },
  {
    path: 'feature',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/feature/feature.module').then((m) => m.FeatureModule),
  },
  {
    path: 'feature-type',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/feature-type/feature-type.module').then((m) => m.FeatureTypeModule),
  },
  {
    path: 'color',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/color/color.module').then((m) => m.ColorModule),
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/Category/category.module').then((m) => m.CategorysModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },

  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'coupon',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/Coupon/coupon.module').then((m) => m.CouponModule),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
