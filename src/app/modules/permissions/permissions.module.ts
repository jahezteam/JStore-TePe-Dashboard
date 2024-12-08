import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePermissionComponent } from './Components/create-permission/create-permission.component';
import { UpdatePermissionComponent } from './Components/update-permission/update-permission.component';
import { DeletePermissionComponent } from './Components/delete-permission/delete-permission.component';
import { PermissionDetailsComponent } from './Components/permission-details/permission-details.component';
import { PermissionListComponent } from './Components/permission-list/permission-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component:CreatePermissionComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'list',
    component:PermissionListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'edit/:id',
    component:UpdatePermissionComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'details/:id',
    component:PermissionDetailsComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  declarations: [
    CreatePermissionComponent,
    UpdatePermissionComponent,
    DeletePermissionComponent,
    PermissionDetailsComponent,
    PermissionListComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
   RouterModule.forChild(routes)
  ]
})
export class PermissionsModule { }
