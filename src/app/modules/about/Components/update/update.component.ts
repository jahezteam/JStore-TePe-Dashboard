import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { About, AboutPermissions } from '../../Models/about';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateComponent {
  aboutPermissions = AboutPermissions;
  valid = false;
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
  permissions: any;
  selectedImage: any;

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
  onImageSelected(file: any | null): void {
    if (file) {
      this.selectedImage = file;
    } else {
      console.log('No file selected or invalid file.');
    }
  }
  registerForm() {
    this.form = {
      id: this.config.data?.id,
      titleEn: this.config.data?.titleEn,
      titleAr: this.config.data?.titleAr,
      descriptionEn: this.config.data?.descriptionEn,
      descriptionAr: this.config.data?.descriptionAr,
      summaryAr: this.config.data?.summaryAr,
      summaryEn: this.config.data?.summaryEn,
      image: environment.imageUrl + this.config.data?.image.path,
    };
    this.validationService.registerForm([
      'titleEn',
      'titleAr',
      'descriptionEn',
      'descriptionAr',
      'summaryAr',
      'summaryEn',
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
    this.form.image = this.selectedImage;
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
