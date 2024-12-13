import { Component } from '@angular/core';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { Slider, SliderPermissions } from '../../Models/slider';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
  sliderPermissions = SliderPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  form: Slider = {
    id: 0,
    title: '',
    titleEn: '',
    summary: '',
    summaryEn: '',
    description: '',
    descriptionEn: '',
    image: '',
    titleLink: '',
    titleLinkEn: '',
    link: '',
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
      title: '',
      titleEn: '',
      summary: '',
      summaryEn: '',
      description: '',
      descriptionEn: '',
      image: '',
      titleLink: '',
      titleLinkEn: '',
      link: '',
    };
    this.validationService.registerForm([
      'title',
      'titleEn',
      'description',
      'descriptionEn',
      'image',
    ]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }
  onImageSelected(file: any | null): void {
    if (file) {
      this.form.image = file;
    } else {
      console.log('No file selected or invalid file.');
    }
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
