import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './Components/create/create.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { ListComponent } from './Components/list/list.component';
import { DetailsComponent } from './Components/details/details.component';
import { FilterComponent } from './Components/filter/filter.component';
import { UpdateComponent } from './Components/update/update.component';
import { AboutPermissions } from './Models/about';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: AboutPermissions.CreateAboutUs },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: AboutPermissions.AboutUsList },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: AboutPermissions.UpdateAboutUs },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: AboutPermissions.AboutUsDetails },
  },
];

@NgModule({
  declarations: [
    CreateComponent,
    FilterComponent,
    ListComponent,
    DetailsComponent,
    UpdateComponent,
  ],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
})
export class AboutModule {}
