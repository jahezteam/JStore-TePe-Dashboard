import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { category } from '../../Models/category';
import { categoryPermissions } from '../../Models/categoryPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],

  providers: [ValidateService, DialogService, MessageService],
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  categorypermissions = categoryPermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
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
  selectedCategory: dropdown = {} as dropdown;
  mainCategories: dropdown[] = [] as dropdown[];
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
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
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
      id: this.config.data?.id,
      nameAr: this.config.data?.nameAr,
      nameEn: this.config.data?.nameEn,
      descriptionAr: this.config.data?.descriptionAr,
      descriptionEn: this.config.data?.descriptionEn,
      icon: this.config.data?.icon,
      image: environment.imageUrl + this.config.data?.image.path,
      mainCategoryId: this.config.data?.mainCategoryId,
    };
    let item = this.mainCategories.filter(
      (x) => x.id == this.config.data?.mainCategoryId,
    );
    this.selectedCategory = item![0];
    this.validationService.registerForm([
      'nameAr',
      'nameEn',
      'descriptionAr',
      'descriptionEn',
      'icon',
    ]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
    this.validInput();
  }
  private validInput() {
    Object.keys(this.form).forEach((i) => {
      this.isInputValid(i, true);
    });
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }

  getValidation() {
    return !this.valid;
  }
  onImageSelected(file: any | null): void {
    if (file) {
      this.selectedImage = file;
    } else {
      console.log('No file selected or invalid file.');
    }
  }

  submit() {
    this.form.image = this.selectedImage;
    this.form.mainCategoryId = this.selectedCategory.id;
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }
}
