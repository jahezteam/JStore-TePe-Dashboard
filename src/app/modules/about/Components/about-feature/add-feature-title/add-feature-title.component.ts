import { Component } from '@angular/core';
import { AboutPermissions, FeatureTitle } from '../../../Models/about';
import { dropdown } from '../../../../../pages/shared-module/Models/dropDown';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from '../../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PickListService } from '../../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-add-feature-title',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './add-feature-title.component.html',
  styleUrl: './add-feature-title.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class AddFeatureTitleComponent {
  valid = false;
  aboutPermissions = AboutPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  aboutId: number = 0;

  form: FeatureTitle = {
    id: this.aboutId,
    titleFeatureAr: '',
    titleFeatureEn: '',
    descriptionFeatureAr: '',
    descriptionFeatureEn: '',
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
      titleFeatureAr: this.config.data?.titleFeatureAr,
      titleFeatureEn: this.config.data?.titleFeatureEn,
      descriptionFeatureAr: this.config.data?.descriptionFeatureAr,
      descriptionFeatureEn: this.config.data?.descriptionFeatureEn,
    };
    this.validationService.registerForm(['titleFeatureAr']);
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
