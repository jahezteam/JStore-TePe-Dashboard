import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { About, AboutPermissions } from '../../Models/about';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateComponent {
  valid = false;
  aboutPermissions = AboutPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  form: About = {
    id: 0,
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    summaryAr: '',
    summaryEn: '',
    image: '',
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
  onImageSelected(file: any | null): void {
    if (file) {
      this.form.image = file;
    } else {
      console.log('No file selected or invalid file.');
    }
  }
  registerForm() {
    this.form = {
      id: 0,
      titleEn: '',
      titleAr: '',
      descriptionEn: '',
      descriptionAr: '',
      summaryAr: '',
      summaryEn: '',
      image: '',
    };
    this.validationService.registerForm([
      'titleEn',
      'titleAr',
      'descriptionEn',
      'descriptionAr',
      'summaryAr',
      'summaryEn',
      'image',
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
