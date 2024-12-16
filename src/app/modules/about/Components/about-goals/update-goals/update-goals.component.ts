import { Component } from '@angular/core';
import { AboutPermissions, AboutUsGoals } from '../../../Models/about';
import { ValidateService } from '../../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { allPermissions } from '../../../../../pages/shared-module/Models/Permissions';
import { ActivatedRoute } from '@angular/router';
import { PickListService } from '../../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-update-goals',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './update-goals.component.html',
  styleUrl: './update-goals.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateGoalsComponent {
  aboutPermissions = AboutPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  aboutId: number = 0;
  form: AboutUsGoals = {
    id: 0,
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    image: '',
    icon: '',
    aboutUsId: +this.aboutId,
  };
  selectedImage: any;
  permissions: any;
  constructor(
    private route: ActivatedRoute,
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
  ) {
    this.route.params.subscribe((params) => {
      this.aboutId = params['id'];
    });
  }
  ngOnInit(): void {
    this.registerForm();
    this.primengConfig.ripple = true;
  }
  onImageSelected(file: any | null): void {
    if (file) {
      this.selectedImage = file;
    } else {
      console.log('No file selected or invalid file.');
    }
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
      image: environment.imageUrl + this.config.data?.image.path,
      aboutUsId: this.aboutId,
    };

    this.validationService.registerForm([
      'titleAr',
      'titleEn',
      'descriptionAr',
      'descriptionEn',
      'icon',
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
