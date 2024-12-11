import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './Components/create/create.component';
import { FilterComponent } from './Components/filter/filter.component';
import { UpdateComponent } from './Components/update/update.component';
import { ListComponent } from './Components/list/list.component';
import { DetailsComponent } from './Components/details/details.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { RegionPermissions } from './Models/regionPermissions';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: RegionPermissions.CreateRegion },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: RegionPermissions.RegionList },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: RegionPermissions.UpdateRegion },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: RegionPermissions.RegionDetails },
  },
];

@NgModule({
  declarations: [
    CreateComponent,
    FilterComponent,
    ListComponent,
    UpdateComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
})
export class RegionModule {}
