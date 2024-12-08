import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { DeleteUserComponent } from './Components/delete-user/delete-user.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { UserListComponent } from './Components/user-list/user-list.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { AssignRoleComponent } from './Components/assign-role/assign-role.component';
import { RemoveRoleComponent } from './Components/remove-role/remove-role.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { userPermissions } from './Models/userPermissions';
import { ChangeUserPasswordComponent } from './Components/change-user-password/change-user-password.component';
import { FilterUsersComponent } from './Components/filter-users/filter-users.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ConfirmSignOutComponent } from './Components/confirm-sign-out/confirm-sign-out.component';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateUserComponent,
    canActivate: [PermissionGuard],
    data: { permission: userPermissions.CreateUser },
  },
  {
    path: 'list',
    component: UserListComponent,
    canActivate: [PermissionGuard],
    data: { permission: userPermissions.UserList },
  },
  {
    path: 'edit/:id',
    component: UpdateUserComponent,
    canActivate: [PermissionGuard],
    data: { permission: userPermissions.UpdateUser },
  },
  {
    path: 'details/:id',
    component: UserProfileComponent,
    canActivate: [PermissionGuard],
    data: { permission: userPermissions.UserDetails },
  },
  {
    path: 'Profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  declarations: [
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UserListComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    AssignRoleComponent,
    RemoveRoleComponent,
    ProfileComponent,
    ChangeUserPasswordComponent,
    FilterUsersComponent,
    ResetPasswordComponent,
    ConfirmSignOutComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
