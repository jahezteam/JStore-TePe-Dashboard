import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { mainCategory } from '../../Models/mainCategory';
import { mainCategoryPermissions } from '../../Models/mainCategoryPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-create-mainCategory',
  templateUrl: './create-mainCategory.component.html',
  styleUrls: ['./create-mainCategory.component.scss'],
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateMainCategoryComponent implements OnInit, OnDestroy {
  valid = false;
  mainCategoryPermissions = mainCategoryPermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();

  form: mainCategory = {
    id: 0,
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    icon: '',
    image: '',
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
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnInit(): void {
    this.registerForm();
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  registerForm() {
    this.form = {
      id: 0,
      nameAr: '',
      nameEn: '',
      descriptionAr: '',
      descriptionEn: '',
      icon: '',
      image: '',
    };
    this.validationService.registerForm([
      'nameAr',
      'nameEn',
      'descriptionAr',
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
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }
}
