import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PermissionGuard } from '../auth/services/permission.guard';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CreateComponent } from './Compinents/create/create.component';
import { FilterComponent } from './Compinents/filter/filter.component';
import { ListComponent } from './Compinents/list/list.component';
import { UpdateComponent } from './Compinents/update/update.component';
import { DetailsComponent } from './Compinents/details/details.component';
import { SliderPermissions } from './Models/slider';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: SliderPermissions.CreateSlider },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: SliderPermissions.SliderList },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: SliderPermissions.UpdateSlider },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: SliderPermissions.SliderDetails },
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
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
  ],
})
export class SliderModule {}
