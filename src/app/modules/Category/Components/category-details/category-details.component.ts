import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { category } from '../../Models/category';
import { categoryPermissions } from '../../Models/categoryPermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';
import { PickListService } from 'app/pages/shared-module/Services/pick-list.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  valid = false;
  categoryPermissions = categoryPermissions;
  allPermissions: allPermissions = new allPermissions();
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
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
    private pickList: PickListService,
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
    this.primengConfig.ripple = true;
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
  }

  submit() {
    this.ref.close(null);
  }
  cancel() {
    this.ref.close(null);
  }
}
