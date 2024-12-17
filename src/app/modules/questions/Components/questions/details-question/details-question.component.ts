import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { Question, QuestionsPermissions } from '../../../Models/questions';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-details-question',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './details-question.component.html',
  styleUrl: './details-question.component.scss',
})
export class DetailsQuestionComponent {
  valid = false;
  questionPermissions = QuestionsPermissions;
  allPermissions: allPermissions = new allPermissions();
  form: Question = {
    id: 0,
    questionBody: '',
    questionBodyEn: '',
    answerBody: '',
    answerBodyEn: '',
    questionTypeId: 0,
  };
  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
  ) {}
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }

  registerForm() {
    this.form = {
      id: this.config.data?.id,
      questionBody: this.config.data?.questionBody,
      questionBodyEn: this.config.data?.questionBodyEn,
      answerBody: this.config.data?.answerBody,
      answerBodyEn: this.config.data?.answerBodyEn,
      questionTypeId: this.config.data?.questionTypeId,
    };
  }

  submit() {
    this.ref.close(null);
  }

  cancel() {
    this.ref.close(null);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
