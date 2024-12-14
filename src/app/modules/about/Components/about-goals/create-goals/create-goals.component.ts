import { Component } from '@angular/core';
import { AboutPermissions, AboutUsGoals } from '../../../Models/about';
import { dropdown } from '../../../../../pages/shared-module/Models/dropDown';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from '../../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PickListService } from '../../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-create-goals',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './create-goals.component.html',
  styleUrl: './create-goals.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateGoalsComponent {
  valid = false;
  aboutPermissions = AboutPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  aboutId: number = 0;
  form: AboutUsGoals = {
    id: 0,
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    icon: '',
    aboutUsId: +this.aboutId,
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
      id: 0,
      titleAr: '',
      titleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      icon: '',
      aboutUsId: +this.aboutId,
    };
    this.validationService.registerForm([
      'titleAr',
      'titleEn',
      'descriptionAr',
      'descriptionEn',
      'icon',
    ]);
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
