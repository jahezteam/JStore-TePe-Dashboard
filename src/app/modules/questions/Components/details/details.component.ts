import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { QuestionsPermissions, QuestionType } from '../../Models/questions';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  questionPermissions = QuestionsPermissions;
  allPermissions: allPermissions = new allPermissions();

  form: QuestionType = {
    id: 0,
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
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
      title: this.config.data?.title,
      titleEn: this.config.data?.titleEn,
      description: this.config.data?.description,
      descriptionEn: this.config.data?.descriptionEn,
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
