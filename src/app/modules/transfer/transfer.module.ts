import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PermissionGuard } from '../auth/services/permission.guard';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { ListComponent } from './Components/list/list.component';
import { TransferPermissions } from './Models/transfer';
import { CompleteTransferComponent } from './Components/complete-transfer/complete-transfer.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: TransferPermissions.LIST },
  },
  {
    path: 'complete/:id',
    component: CompleteTransferComponent,
    canActivate: [PermissionGuard],
    data: { permission: TransferPermissions.DETAILS },
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
export class TransferModule {}
