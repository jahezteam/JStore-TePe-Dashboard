import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { category } from '../../Models/category';
import { categoryPermissions } from '../../Models/categoryPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  valid = false;
  categoryPermissions = categoryPermissions;
  mainCategories: dropdown[] = [] as dropdown[];
  selectedCategory: dropdown = {} as dropdown;

  form: category = {
    id: 0,
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    icon: '',
    image: '',
    mainCategoryId: '',
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

  ngOnInit(): void {
    this.pickList.getMainCategories().subscribe((res) => {
      this.mainCategories = res;
      this.registerForm();
      this.primengConfig.ripple = true;
    });
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
      mainCategoryId: '',
    };
    this.validationService.registerForm([
      'nameAr',
      'nameEn',
      'descriptionAr',
      'descriptionEn',
      'icon',
      'image',
      'mainCategoryId',
    ]);
    this.validationService.validStatus.subscribe(
      (status) => {
        this.form.mainCategoryId = this.selectedCategory.id;
        this.valid = status
      },
    );

  }

  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }

  getValidation() {
    return !this.valid;
  }
  submit() {
    this.form.mainCategoryId = this.selectedCategory.id;
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }

  onImageSelected(file: any | null): void {
    if (file) {
      this.form.image = file
    } else {
      console.log('No file selected or invalid file.');
    }
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
