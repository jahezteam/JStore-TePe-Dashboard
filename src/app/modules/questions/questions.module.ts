import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './Components/create/create.component';
import { PermissionGuard } from '../auth/services/permission.guard';
import { QuestionsPermissions } from './Models/questions';
import { ListComponent } from './Components/list/list.component';
import { DetailsComponent } from './Components/details/details.component';
import { UpdateComponent } from './Components/update/update.component';
import { ListQuestionComponent } from './Components/questions/list-question/list-question.component';

export const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permission: QuestionsPermissions.CreateQuestionType },
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permission: QuestionsPermissions.QuestionTypeList },
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [PermissionGuard],
    data: { permission: QuestionsPermissions.UpdateQuestionType },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: QuestionsPermissions.QuestionTypeDetails,
    },
  },
  {
    path: 'questions/:id',
    component: ListQuestionComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: QuestionsPermissions.QuestionList,
    },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModuleModule, RouterModule.forChild(routes)],
})
export class QuestionsModule {}
