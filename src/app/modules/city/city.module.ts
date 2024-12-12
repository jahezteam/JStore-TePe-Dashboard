import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './component/create/create.component';
import { FilterComponent } from './component/filter/filter.component';
import { UpdateComponent } from './component/update/update.component';
import { ListComponent } from './component/list/list.component';
import { DetailsComponent } from './component/details/details.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CityPermissions } from './models/cityPermissions';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: CityPermissions.CreateCity },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: CityPermissions.CityList },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: CityPermissions.UpdateCity },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: CityPermissions.CityDetails },
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
export class CityModule {}
