import { Component } from '@angular/core';
import { AboutPermissions, AboutUsQuestions } from '../../../Models/about';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { ValidateService } from '../../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';
import { ActivatedRoute } from '@angular/router';
import { PickListService } from '../../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [SharedModuleModule],
  providers: [ValidateService, DialogService, MessageService],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.scss',
})
export class UpdateQuestionComponent {
  aboutPermissions = AboutPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  aboutId: number = 0;
  form: AboutUsQuestions = {
    id: 0,
    questionBody: '',
    questionBodyEn: '',
    answerBody: '',
    answerBodyEn: '',
    aboutUsId: +this.aboutId,
  };
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
      this.aboutId = params['id'];
    });
  }

  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }

  registerForm() {
    this.form = {
      answerBody: this.config.data?.answerBody,
      answerBodyEn: this.config.data?.answerBodyEn,
      questionBody: this.config.data?.questionBody,
      questionBodyEn: this.config.data?.questionBodyEn,
      id: this.config.data?.id,
      aboutUsId: +this.aboutId,
    };
    this.validationService.registerForm(['answerBody', 'questionBody']);
    this.validationService.validStatus.subscribe((status) => {
      this.valid = status;
    });
  }

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
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
