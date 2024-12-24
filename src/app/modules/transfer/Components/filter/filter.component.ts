import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';
import { FilterType } from '../../Models/transfer';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';

@Component({
  selector: 'app-filter',
  standalone: true,

  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [ValidateService, MessageService],
  imports: [SharedModuleModule],
})
export class FilterComponent {
  data: FilterType = {} as FilterType;
  selectedCategory: dropdown = {} as dropdown;
  categories: dropdown[] = [] as dropdown[];
  selectedMainCategory: dropdown = {} as dropdown;
  mainCategories: dropdown[] = [] as dropdown[];
  // selectedProduct: dropdown = {} as dropdown;
  // products: dropdown[] = [] as dropdown[];
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private validationService: ValidateService,
    private changeDetection: ChangeDetectorRef,
    private messageService: MessageService,
    private auth: AuthenticationService,
    private pickList: PickListService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.data = this.config.data;
  }
  loadData() {
    this.pickList.getMainCategories().subscribe((res) => {
      this.mainCategories = res;
    });
  }

  handleSelectCategory(event: any) {}
  handleSelectMainCategory(event: any) {
    this.pickList.getMainCategories().subscribe((res: any) => {
      this.categories = res.find((x: any) => x.id == event.value.id).data;
    });
  }

  ok() {
    this.data.categoryId = this.selectedCategory.id;
    this.data.mainCategoryId = this.selectedMainCategory.id;
    if (this.data.categoryId == null) {
      delete this.data.categoryId;
    }
    if (this.data.mainCategoryId == null) {
      delete this.data.mainCategoryId;
    }
    this.ref.close(this.data);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  close() {
    this.ref.close(null);
  }
  clearFilter() {
    this.data = {} as FilterType;
    this.changeDetection.detectChanges();
    this.ref.close(null);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
