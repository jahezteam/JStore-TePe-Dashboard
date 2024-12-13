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
      import('./shared-module/shared-module.module').then(
        (m) => m.SharedModuleModule,
      ),
  },
  {
    path: 'permissions',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/permissions/permissions.module').then(
        (m) => m.PermissionsModule,
      ),
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
      import('../modules/MainCategory/mainCategory.module').then(
        (m) => m.MainCategorysModule,
      ),
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
      import('../modules/feature-type/feature-type.module').then(
        (m) => m.FeatureTypeModule,
      ),
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/Category/category.module').then(
        (m) => m.CategorysModule,
      ),
  },
  {
    path: 'region',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/region/region.module').then((m) => m.RegionModule),
  },
  {
    path: 'city',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/city/city.module').then((m) => m.CityModule),
  },
  {
    path: 'newsletter',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/newsletter/newsletter.module').then(
        (m) => m.NewsletterModule,
      ),
  },
  {
    path: 'contact',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'branch',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/branch/branch.module').then((m) => m.BranchModule),
  },
  {
    path: 'slider',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/slider/slider.module').then((m) => m.SliderModule),
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
