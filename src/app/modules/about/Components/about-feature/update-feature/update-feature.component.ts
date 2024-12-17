import { Component } from '@angular/core';
import { ValidateService } from '../../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { AboutPermissions, AboutUsFeacturers } from '../../../Models/about';
import { PickListService } from '../../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-update-feature',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './update-feature.component.html',
  styleUrl: './update-feature.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateFeatureComponent {
  aboutPermissions = AboutPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  aboutId: number = 0;
  form: AboutUsFeacturers = {
    id: 0,
    featurNameAr: '',
    featurNameEn: '',
    counter: 0,
    aboutUsId: this.aboutId,
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
      this.aboutId = params['id'];
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
      featurNameAr: this.config.data?.featurNameAr,
      featurNameEn: this.config.data?.featurNameEn,
      counter: this.config.data?.counter,
      aboutUsId: this.aboutId,
    };

    this.validationService.registerForm(['featurNameAr', 'featurNameEn']);

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
