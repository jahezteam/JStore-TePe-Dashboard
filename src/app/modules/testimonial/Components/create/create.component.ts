import { Component } from '@angular/core';
import { dropdown } from "../../../../pages/shared-module/Models/dropDown";
import { Testimonial, TestimonialPermissions } from "../../Models/testimonial";
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { ValidateService } from "../../../../pages/shared-module/Services/validate.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { PickListService } from "../../../../pages/shared-module/Services/pick-list.service";
import { AuthenticationService } from "../../../auth/services/authentication.service";
import { SharedModuleModule } from "../../../../pages/shared-module/shared-module.module";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModuleModule],
  providers: [ValidateService, DialogService, MessageService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  valid = false;
  testimonialPermissions = TestimonialPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();
  form: Testimonial = {
    id: 0,
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    image: '',
    alternateText: '',
    alternateTextEn: '',
    jobTitle: '',
    jobTitleEn: '',
    imageTitle: '',
    imageTitleEn: '',
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
      name: '',
      nameEn: '',
      description: '',
      descriptionEn: '',
      jobTitle: '',
      jobTitleEn: '',
      image: '',
      alternateText: '',
      alternateTextEn: '',
      imageTitle: '',
      imageTitleEn: '',
    };
    this.validationService.registerForm([
      'name',
      'nameEn',
      'description',
      'descriptionEn',
      'jobTitle',
      'jobTitleEn',
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
