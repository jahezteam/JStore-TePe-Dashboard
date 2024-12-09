import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CommonModule } from "@angular/common";
import { CreateComponent } from "./Components/create/create.component";
import { PermissionGuard } from "../auth/services/permission.guard";
import { FeatureTypePermissions } from "./Modals/feature-type-permissions";
import { ListComponent } from "./Components/list/list.component";
import { UpdateComponent } from "./Components/update/update.component";
import { DetailsComponent } from "./Components/details/details.component";
import { FilterComponent } from "./Components/filter/filter.component";

export const routes: Routes = [
  {
    path: 'add',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeatureTypePermissions.CreateFeatureType},
  },
  {
    path: 'list',
    component:ListComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeatureTypePermissions.FeatureTypeList},
  },
  {
    path: 'edit/:id',
    component:UpdateComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeatureTypePermissions.UpdateFeatureType},
  },
  {
    path: 'details/:id',
    component:DetailsComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeatureTypePermissions.FeatureTypeDetails},
  }
];

@NgModule({
  declarations: [
    CreateComponent,
    FilterComponent,
    ListComponent,
    UpdateComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
  ]
})
export class FeatureTypeModule { }
