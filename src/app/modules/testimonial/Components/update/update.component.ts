import { Component } from '@angular/core';
import { Testimonial, TestimonialPermissions } from '../../Models/testimonial';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
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
import { environment } from '../../../../../environments/environment';

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
  testimonialPermissions = TestimonialPermissions;
  allPermissions: allPermissions = new allPermissions();
  permissions: any;
  form: Testimonial = {
    id: 0,
    name: '',
    nameEn: '',
    jobTitle: '',
    jobTitleEn: '',
    description: '',
    descriptionEn: '',
    image: '',
    imageTitle: '',
    imageTitleEn: '',
    alternateText: '',
    alternateTextEn: '',
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
      name: this.config.data?.name,
      nameEn: this.config.data?.nameEn,
      jobTitle: this.config.data?.jobTitle,
      jobTitleEn: this.config.data?.jobTitleEn,
      description: this.config.data?.description,
      descriptionEn: this.config.data?.descriptionEn,
      image: environment.imageUrl + this.config.data?.image.path,
      imageTitle: this.config.data?.imageTitle,
      imageTitleEn: this.config.data?.imageTitleEn,
      alternateText: this.config.data?.alternateText,
      alternateTextEn: this.config.data?.alternateTextEn,
    };
    this.validationService.registerForm([
      'name',
      'nameEn',
      'jobTitle',
      'jobTitleEn',
      'description',
      'descriptionEn',
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
