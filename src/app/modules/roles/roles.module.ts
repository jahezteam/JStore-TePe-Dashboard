import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoleComponent } from './Components/create-role/create-role.component';
import { UpdateRoleComponent } from './Components/update-role/update-role.component';
import { RoleListComponent } from './Components/role-list/role-list.component';
import { RoleDetailsComponent } from './Components/role-details/role-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { PermissionGuard } from '../auth/services/permission.guard';
import { rolePermissions } from './Models/rolePermissions';
import { FilterRolesComponent } from './Components/filter-roles/filter-roles.component';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component:CreateRoleComponent,
    canActivate:[PermissionGuard],
    data:{permission:rolePermissions.CreateRole},
  },
  {
    path: 'list',
    component:RoleListComponent,
    canActivate:[PermissionGuard],
    data:{permission:rolePermissions.RoleList},
  },
  {
    path: 'edit/:id',
    component:UpdateRoleComponent,
    canActivate:[PermissionGuard],
    data:{permission:rolePermissions.UpdateRole},
  },
  {
    path: 'details/:id',
    component:RoleDetailsComponent,
    canActivate:[PermissionGuard],
    data:{permission:rolePermissions.RoleDetails},
  }
];

@NgModule({
  declarations: [
    CreateRoleComponent,
    UpdateRoleComponent,
    RoleListComponent,
    RoleDetailsComponent,
    FilterRolesComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
   RouterModule.forChild(routes)
  ]
})
export class RolesModule { }
