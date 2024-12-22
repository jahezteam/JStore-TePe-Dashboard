import { Component } from '@angular/core';
import { Institution, InstitutionPermissions } from '../../Models';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateComponent {
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
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
  ) {}
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  ngOnInit(): void {
    this.registerForm();
  }

  registerForm() {
    this.form = {
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
    this.validationService.registerForm(['nameAr', 'nameEn', 'email', 'phone']);
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
