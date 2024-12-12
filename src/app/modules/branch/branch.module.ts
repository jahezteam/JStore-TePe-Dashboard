import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './Component/create/create.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { ListComponent } from './Component/list/list.component';
import { DetailsComponent } from './Component/details/details.component';
import { FilterComponent } from './Component/filter/filter.component';
import { BranchPermissions } from './Models/branch';
import { UpdateComponent } from './Component/update/update.component';
import { MapComponent } from './Component/map/map.component';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: BranchPermissions.CreateBranch },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: BranchPermissions.BranchList },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: BranchPermissions.UpdateBranch },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: BranchPermissions.BranchDetails },
  },
];

@NgModule({
  declarations: [
    CreateComponent,
    FilterComponent,
    ListComponent,
    DetailsComponent,
    UpdateComponent,
    MapComponent,
  ],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
})
export class BranchModule {}
