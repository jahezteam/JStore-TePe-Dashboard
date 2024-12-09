import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CommonModule } from "@angular/common";
import { CreateComponent } from "./Components/create/create.component";
import { PermissionGuard } from "../auth/services/permission.guard";
import { ListComponent } from "./Components/list/list.component";
import { UpdateComponent } from "./Components/update/update.component";
import { DetailsComponent } from "./Components/details/details.component";
import { FilterComponent } from "./Components/filter/filter.component";
import { FeaturePermissions } from "./Modals/feature-permissions";

export const routes: Routes = [
  {
    path: 'add',
    component:CreateComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeaturePermissions.CreateFeature},
  },
  {
    path: 'list',
    component:ListComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeaturePermissions.FeatureList},
  },
  {
    path: 'edit/:id',
    component:UpdateComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeaturePermissions.UpdateFeature},
  },
  {
    path: 'details/:id',
    component:DetailsComponent,
    canActivate:[PermissionGuard],
    data:{permission:FeaturePermissions.FeatureDetails},
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
export class FeatureModule { }
