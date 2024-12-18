import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PermissionGuard } from '../auth/services/permission.guard';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { FormComponent } from './Components/form/form.component';
import { SettingPermissions } from './Models/setting';

export const routes: Routes = [
  {
    path: 'update',
    component: FormComponent,
    canActivate: [PermissionGuard],
    data: { permission: SettingPermissions.List },
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
  ],
})
export class SettingsModule {}
