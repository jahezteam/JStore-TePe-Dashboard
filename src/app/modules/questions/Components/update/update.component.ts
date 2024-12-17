import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { QuestionsPermissions, QuestionType } from '../../Models/questions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { ToastModule } from 'primeng/toast';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ToastModule, SharedModuleModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateComponent {
  questionsPermissions = QuestionsPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  form: QuestionType = {
    id: 0,
    title: '',
    titleEn: '',
    descriptionEn: '',
    description: '',
  };
  permissions: any;

  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private pickList: PickListService,
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
      titleEn: this.config.data?.titleEn,
      title: this.config.data?.title,
      description: this.config.data?.description,
      descriptionEn: this.config.data?.descriptionEn,
    };

    this.validationService.registerForm([
      'title',
      'titleEn',
      'description',
      'descriptionEn',
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
    console.log(this.form);
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
