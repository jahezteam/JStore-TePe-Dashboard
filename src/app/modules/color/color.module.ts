import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateColorComponent } from './Components/create-color/create-color.component';
import { UpdateColorComponent } from './Components/update-color/update-color.component';
import { ColorListComponent } from './Components/color-list/color-list.component';
import { ColorDetailsComponent } from './Components/color-details/color-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { PermissionGuard } from '../auth/services/permission.guard';
import { colorPermissions } from './Models/colorPermissions';
import { FilterColorsComponent } from './Components/filter-color/filter-color.component';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

export const routes: Routes = [
  {
    path: 'add',
    component:CreateColorComponent,
    canActivate:[PermissionGuard],
    data:{permission:colorPermissions.CreateColor},
  },
  {
    path: 'list',
    component:ColorListComponent,
    canActivate:[PermissionGuard],
    data:{permission:colorPermissions.ColorList},
  },
  {
    path: 'edit/:id',
    component:UpdateColorComponent,
    canActivate:[PermissionGuard],
    data:{permission:colorPermissions.UpdateColor},
  },
  {
    path: 'details/:id',
    component:ColorDetailsComponent,
    canActivate:[PermissionGuard],
    data:{permission:colorPermissions.ColorDetails},
  }
];

@NgModule({
  declarations: [
    CreateColorComponent,
    UpdateColorComponent,
    ColorListComponent,
    ColorDetailsComponent,
    FilterColorsComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
   RouterModule.forChild(routes)
  ]
})
export class ColorModule { }
