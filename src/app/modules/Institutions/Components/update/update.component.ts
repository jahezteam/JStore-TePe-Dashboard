import { Component } from '@angular/core';
import { Institution, InstitutionPermissions } from '../../Models';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateComponent {
  valid = false;
  institutionPermissions = InstitutionPermissions;
  form: Institution = {
    id: 0,
    nameAr: '',
    nameEn: '',
    email: '',
    phone: '',
    locationAr: '',
    locationEn: '',
    descriptionAr: '',
    descriptionEn: '',
  };

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
      nameAr: this.config.data?.nameAr,
      nameEn: this.config.data?.nameEn,
      email: this.config.data?.email,
      phone: this.config.data?.phone,
      locationAr: this.config.data?.locationAr,
      locationEn: this.config.data?.locationEn,
      descriptionAr: this.config.data?.descriptionAr,
      descriptionEn: this.config.data?.descriptionEn,
    };

    this.validationService.registerForm(['nameAr', 'nameEn', 'email', 'phone']);

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
