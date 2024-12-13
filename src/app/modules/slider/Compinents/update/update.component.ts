import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Slider, SliderPermissions } from '../../Models/slider';
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
  valid = false;
  sliderPermissions = SliderPermissions;
  allPermissions: allPermissions = new allPermissions();
  permissions: any;
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
      title: this.config.data?.title,
      titleEn: this.config.data?.titleEn,
      summary: this.config.data?.summary,
      summaryEn: this.config.data?.summaryEn,
      description: this.config.data?.description,
      descriptionEn: this.config.data?.descriptionEn,
      image: environment.imageUrl + this.config.data?.image.path,
      titleLink: this.config.data?.titleLink,
      titleLinkEn: this.config.data?.titleLinkEn,
      link: this.config.data?.link,
    };

    this.validationService.registerForm([
      'title',
      'titleEn',
      'description',
      'descriptionEn',
      'image',
    ]);

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
