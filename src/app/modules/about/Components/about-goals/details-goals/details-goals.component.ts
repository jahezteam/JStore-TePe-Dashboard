import { Component } from '@angular/core';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';
import { AboutPermissions, AboutUsGoals } from '../../../Models/about';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../../auth/services/authentication.service';

@Component({
  selector: 'app-details-goals',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './details-goals.component.html',
  styleUrl: './details-goals.component.scss',
})
export class DetailsGoalsComponent {
  valid = false;
  aboutPermissions = AboutPermissions;
  allPermissions: allPermissions = new allPermissions();
  form: AboutUsGoals = {
    id: 0,
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    icon: '',
    aboutUsId: 0,
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
      titleAr: this.config.data?.titleAr,
      titleEn: this.config.data?.titleEn,
      descriptionAr: this.config.data?.descriptionAr,
      descriptionEn: this.config.data?.descriptionEn,
      icon: this.config.data?.icon,
      aboutUsId: this.config.data?.aboutUsId,
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
