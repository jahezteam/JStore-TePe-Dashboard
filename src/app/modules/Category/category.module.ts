import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './Components/create-category/create-category.component';
import { UpdateCategoryComponent } from './Components/update-category/update-category.component';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { CategoryDetailsComponent } from './Components/category-details/category-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { PermissionGuard } from '../auth/services/permission.guard';
import { categoryPermissions } from './Models/categoryPermissions';
import { FilterCategorysComponent } from './Components/filter-category/filter-category.component';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component:CreateCategoryComponent,
    canActivate:[PermissionGuard],
    data:{permission:categoryPermissions.CreateCategory},
  },
  {
    path: 'list',
    component:CategoryListComponent,
    canActivate:[PermissionGuard],
    data:{permission:categoryPermissions.CategoryList},
  },
  {
    path: 'edit/:id',
    component:UpdateCategoryComponent,
    canActivate:[PermissionGuard],
    data:{permission:categoryPermissions.UpdateCategory},
  },
  {
    path: 'details/:id',
    component:CategoryDetailsComponent,
    canActivate:[PermissionGuard],
    data:{permission:categoryPermissions.CategoryDetails},
  }
];

@NgModule({
  declarations: [
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    FilterCategorysComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
   RouterModule.forChild(routes)
  ]
})
export class CategorysModule { }
