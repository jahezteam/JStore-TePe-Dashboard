import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PermissionGuard } from '../auth/services/permission.guard';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CreateComponent } from './Components/create/create.component';
import { ListComponent } from './Components/list/list.component';
import { UpdateComponent } from './Components/update/update.component';
import { DetailsComponent } from './Components/details/details.component';
import { TestimonialPermissions } from './Models/testimonial';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: TestimonialPermissions.Create },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: TestimonialPermissions.List },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: TestimonialPermissions.Update },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: TestimonialPermissions.Details },
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
export class TestimonialModule {}
