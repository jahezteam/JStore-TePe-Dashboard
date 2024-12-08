import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMainCategoryComponent } from './Components/create-mainCategory/create-mainCategory.component';
import { UpdateMainCategoryComponent } from './Components/update-mainCategory/update-mainCategory.component';
import { MainCategoryListComponent } from './Components/mainCategory-list/mainCategory-list.component';
import { MainCategoryDetailsComponent } from './Components/mainCategory-details/mainCategory-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { PermissionGuard } from '../auth/services/permission.guard';
import { mainCategoryPermissions } from './Models/mainCategoryPermissions';
import { FilterMainCategorysComponent } from './Components/filter-mainCategory/filter-mainCategory.component';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component:CreateMainCategoryComponent,
    canActivate:[PermissionGuard],
    data:{permission:mainCategoryPermissions.CreateMainCategory},
  },
  {
    path: 'list',
    component:MainCategoryListComponent,
    canActivate:[PermissionGuard],
    data:{permission:mainCategoryPermissions.MainCategoryList},
  },
  {
    path: 'edit/:id',
    component:UpdateMainCategoryComponent,
    canActivate:[PermissionGuard],
    data:{permission:mainCategoryPermissions.UpdateMainCategory},
  },
  {
    path: 'details/:id',
    component:MainCategoryDetailsComponent,
    canActivate:[PermissionGuard],
    data:{permission:mainCategoryPermissions.MainCategoryDetails},
  }
];

@NgModule({
  declarations: [
    CreateMainCategoryComponent,
    UpdateMainCategoryComponent,
    MainCategoryListComponent,
    MainCategoryDetailsComponent,
    FilterMainCategorysComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
   RouterModule.forChild(routes)
  ]
})
export class MainCategorysModule { }
