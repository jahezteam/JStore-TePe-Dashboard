import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './Components/create/create.component';
import { UpdateComponent } from './Components/update/update.component';
import { ListComponent } from './Components/list/list.component';
import { DetailsComponent } from './Components/details/details.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { InstitutionPermissions } from './Models';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: InstitutionPermissions.CREATE },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: InstitutionPermissions.LIST },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: InstitutionPermissions.UPDATE },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: InstitutionPermissions.DETAILS },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
})
export class InstitutionsModule {}
