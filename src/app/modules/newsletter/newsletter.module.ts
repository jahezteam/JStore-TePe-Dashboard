import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './Components/create/create.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { ListComponent } from './Components/list/list.component';
import { DetailsComponent } from './Components/details/details.component';
import { FilterComponent } from './Components/filter/filter.component';
import { NewsletterPermissions } from './Models/newsletter';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: NewsletterPermissions.CreateNewsLetter },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: NewsletterPermissions.NewsLetterList },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: { permission: NewsletterPermissions.NewsLetterDetails },
  },
];

@NgModule({
  declarations: [
    CreateComponent,
    FilterComponent,
    ListComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
})
export class NewsletterModule {}
