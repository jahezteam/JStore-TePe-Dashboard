import { Component } from '@angular/core';
import { ValidateService } from '../../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';
import { AboutPermissions, QuestionsTitle } from '../../../Models/about';
import { dropdown } from '../../../../../pages/shared-module/Models/dropDown';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { ActivatedRoute } from '@angular/router';
import { PickListService } from '../../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';

@Component({
  selector: 'app-add-questions-title',
  standalone: true,
  imports: [SharedModuleModule],
  providers: [ValidateService, DialogService, MessageService],
  templateUrl: './add-questions-title.component.html',
  styleUrl: './add-questions-title.component.scss',
})
export class AddQuestionsTitleComponent {
  valid = false;
  aboutPermissions = AboutPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  aboutId: number = 0;
  form: QuestionsTitle = {
    id: 0,
    titleQuestionAr: '',
    titleQuestionEn: '',
    descriptionQuestionAr: '',
    descriptionQuestionEn: '',
    aboutUsId: this.aboutId,
  };

  constructor(
    private route: ActivatedRoute,
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
    public config: DynamicDialogConfig,
  ) {
    this.route.params.subscribe((params) => {
      this.aboutId = params['id'];
    });
  }

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  ngOnInit(): void {
    this.registerForm();
  }
  registerForm() {
    this.form = {
      id: this.aboutId,
      titleQuestionAr: this.config.data.titleQuestionAr,
      titleQuestionEn: this.config.data.titleQuestionEn,
      descriptionQuestionAr: this.config.data.descriptionQuestionAr,
      descriptionQuestionEn: this.config.data.descriptionQuestionEn,
      aboutUsId: this.aboutId,
    };
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }

  getValidation() {
    return !this.valid;
  }
  submit() {
    if (this.valid) {
      this.ref.close(this.form);
    }
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