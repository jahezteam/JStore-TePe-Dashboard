import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Testimonial, TestimonialPermissions } from '../../Models/testimonial';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { environment } from '../../../../../environments/environment';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  testimonialPermissions = TestimonialPermissions;
  allPermissions: allPermissions = new allPermissions();

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
  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
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
  }
  submit() {
    this.ref.close(null);
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
