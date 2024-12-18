import { Component } from '@angular/core';
import { AboutPermissions, AboutUsSlider } from '../../Models/about';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';
import { MultiImageUploadComponent } from '../../../../pages/shared-module/components/multi-image-upload/multi-image-upload.component';

@Component({
  selector: 'app-about-slider',
  standalone: true,
  imports: [SharedModuleModule, MultiImageUploadComponent],
  templateUrl: './about-slider.component.html',
  styleUrl: './about-slider.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class AboutSliderComponent {
  valid = false;
  aboutPermissions = AboutPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  form: AboutUsSlider = {
    id: 0,
    images: [],
    aboutUsId: 0,
  };
  selectedImages: (File | string)[] = [];

  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
    public config: DynamicDialogConfig,
  ) {}

  handleImages(files: (File | string)[]): void {
    this.selectedImages = files;
    this.form.images = files;
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  ngOnInit(): void {
    this.registerForm();
  }
  registerForm() {
    this.form = {
      id: 0,
      images: this.config.data?.images,
      aboutUsId: 0,
    };
    this.selectedImages = this.config.data?.images;
    this.validationService.registerForm([]);
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
