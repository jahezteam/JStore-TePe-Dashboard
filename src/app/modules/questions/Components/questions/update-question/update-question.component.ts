import { Component } from '@angular/core';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { Question, QuestionsPermissions } from "../../../Models/questions";
import { ActivatedRoute } from "@angular/router";
import {  MessageService, PrimeNGConfig } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthenticationService } from "../../../../auth/services/authentication.service";
import { ValidateService } from "../../../../../pages/shared-module/Services/validate.service";
import { PickListService } from "../../../../../pages/shared-module/Services/pick-list.service";
import { SharedModuleModule } from "../../../../../pages/shared-module/shared-module.module";

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateQuestionComponent {
  qeustionPermissions = QuestionsPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  questionTypeId: number = 0;
  form: Question = {
    id: 0,
    questionBody: '',
    questionBodyEn: '',
    answerBody: '',
    answerBodyEn: '',
    questionTypeId: this.questionTypeId,
  };
  permissions: any;
  constructor(
    private route: ActivatedRoute,
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
  ) {
    this.route.params.subscribe((params) => {
      this.questionTypeId = params['id'];
    });
  }

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
      questionTypeId: this.questionTypeId,
    };

    this.validationService.registerForm([
      'questionBody',
      'questionBodyEn',
      'answerBody',
      'answerBodyEn',
    ]);

    this.validationService.validStatus.subscribe((status) => {
      this.valid = status;
    });
  }

  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }

  getValidation() {
    return !this.valid;
  }
  submit() {
    this.ref.close(this.form);
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
