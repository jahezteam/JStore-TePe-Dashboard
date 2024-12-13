import { Component } from '@angular/core';
import { Slider, SliderPermissions } from '../../Models/slider';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  sliderPermissions = SliderPermissions;
  allPermissions: allPermissions = new allPermissions();

  form: Slider = {
    id: 0,
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    image: '',
    link: '',
    summaryEn: '',
    summary: '',
    titleLink: '',
    titleLinkEn: '',
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
      title: this.config.data?.title,
      titleEn: this.config.data?.titleEn,
      description: this.config.data?.description,
      descriptionEn: this.config.data?.descriptionEn,
      image: environment.imageUrl + this.config.data?.image.path,
      link: this.config.data?.link,
      summaryEn: this.config.data?.summaryEn,
      summary: this.config.data?.summary,
      titleLink: this.config.data?.titleLink,
      titleLinkEn: this.config.data?.titleLinkEn,
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
