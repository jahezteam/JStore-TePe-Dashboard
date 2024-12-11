import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig, } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { category } from '../../Models/category';
import { categoryPermissions } from '../../Models/categoryPermissions';
import { CategorysService } from '../../Services/category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { FilterCategorysComponent } from '../filter-category/filter-category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { PickListService } from 'app/pages/shared-module/Services/pick-list.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  date: any;
  mainCategories: dropdown[] = [] as dropdown[];
  selectedCategory: dropdown = {} as dropdown;
  categoryPermissions = categoryPermissions;
  paginator: paginator = {
    categoryId: 0,
    levelId: 0,
    pageNumber: 1,
    pageSize: environment.pageSize,
    questionTypeId: 0,
    searchText: '',
    sortingColumn: 'code',
    sortingType: 'asc',
  };
  filteredDate: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CategorysService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private AuthService: AuthenticationService,
    private confirmationService: ConfirmationService,
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
      this.loadData();
      this.primengConfig.ripple = true;
    });
    this.primengConfig.ripple = true;

    // this.filteredDate=this.date;
    // this.totalPages = this.filteredDate.length / this.pageSize;
    // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
  }
  getMainCategory(id: any) {
    let item = this.mainCategories.filter((x) => x.id == id);
    return item![0]?.name;
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  changePage(page: number) {
    if (page < 0 || page === this.currentPage || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginator.pageNumber = this.currentPage;

    this.service.getPagination(this.paginator).subscribe((res: any) => {
      if (res) {
        this.date = res.items;
        this.filteredDate = this.date;
        this.totalPages = res.totalPages;
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      } else {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'Error',
          detail: 'Error occured Please contact system adminstrator',
        });
      }
    });
  }
  changePageSize(pageSize: number) {
    this.paginator.pageNumber = 1;
    this.paginator.pageSize = pageSize;

    this.service.getPagination(this.paginator).subscribe((res: any) => {
      if (res) {
        this.date = res.items;
        this.filteredDate = this.date;
        this.totalPages = res.totalPages;
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      } else {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'Error',
          detail: 'Error occured Please contact system adminstrator',
        });
      }
    });
  }
  isAuthorized(per: string) {
    return this.AuthService.isAuthorized(per);
  }
  currentPage = 1;
  totalPages: number = 0;
  pager: number[] = [1];
  pageSize: number = environment.pageSize;

  loadData() {
    this.service.getPagination(this.paginator).subscribe((res: any) => {
      if (res) {
        this.date = res.items;
        this.filteredDate = res.items;
        this.totalPages = res.totalPages;
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      } else {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'Error',
          detail: 'Error occured Please contact system adminstrator',
        });
      }
    });
  }

  routeToAdd() {
    this.router.navigateByUrl('/categorys/add');
  }
  routeToEdit(id: any) {
    this.router.navigateByUrl('/categorys/edit/' + id);
  }
  routeToDetails(id: any) {
    this.router.navigateByUrl('/categorys/details/' + id);
  }
  ref: DynamicDialogRef = new DynamicDialogRef();
  openAddPopup() {
    this.ref = this.dialogService.open(CreateCategoryComponent, {
      header: 'Create Category',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: category) => {
      if (item != null) {
        this.service.post(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Category Created Succesfully',
            });
            this.ngOnInit();
          } else {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: 'Error occured Please contact system adminstrator',
            });
          }
        });

        this.changeDetection.detectChanges();
      }
    });
  }
  editRef: DynamicDialogRef = {} as DynamicDialogRef;
  openEditPopup(item: category) {
    this.editRef = this.dialogService.open(UpdateCategoryComponent, {
      header: 'Edit Category',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.editRef.onClose.subscribe((item: category) => {
      if (item != null) {
        this.service.update(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Category updated Succesfully',
            });
            this.ngOnInit();
          } else {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: 'Error occured Please contact system adminstrator',
            });
          }
        });

        this.changeDetection.detectChanges();
      }
    });
  }
  refDetails: DynamicDialogRef = {} as DynamicDialogRef;
  openDetailsPopup(item: category) {
    this.refDetails = this.dialogService.open(CategoryDetailsComponent, {
      header: 'Category Details',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.refDetails.onClose.subscribe((item: category) => {
      if (item != null) {
      }
    });
  }
  filter: filter = {} as filter;
  reffilter: DynamicDialogRef = {} as DynamicDialogRef;
  openFilterPopup() {
    this.reffilter = this.dialogService.open(FilterCategorysComponent, {
      header: 'Filter Categorys',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: this.filter,
    });

    this.reffilter.onClose.subscribe((data: filter) => {
      if (data != null) {
        this.filter = data;
        this.paginator.pageNumber = 1;
        this.paginator.pageSize = environment.pageSize;
        this.paginator.searchText = '';
        this.paginator.sortingColumn = 'code';
        this.paginator.sortingType = 'asc';

        this.service
          .getPaginationFilter(this.filter.isActive, this.paginator)
          .subscribe((res: any) => {
            if (res) {
              this.date = res.items as any;
              this.filteredDate = this.date;
              this.totalPages = res.totalPages;
              this.pager = Array.from(
                { length: this.totalPages },
                (v, k) => k + 1,
              );
              this.changeDetection.detectChanges();
            } else {
              this.messageService.add({
                key: 'tl',
                severity: 'error',
                summary: 'Error',
                detail: 'Error occured Please contact system adminstrator',
              });
            }
          });

        this.changeDetection.detectChanges();
      }
    });
  }
  checkString(item: string) {
    return item != null && item != '' && item != ' ';
  }
  searchInput(event: any) {
    this.paginator.searchText = event?.target?.value;
    this.paginator.pageNumber = 1;
    this.service.search(this.paginator, true).subscribe((res: any) => {
      if (res) {
        this.date = res.items;
        this.filteredDate = this.date;
        this.totalPages = res.totalPages;
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      } else {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'Error',
          detail: 'Error occured Please contact system adminstrator',
        });
      }
    });
  }
  deleteItem(item: category) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete This Category',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Category Deleted Succesfully',
            });
            this.ngOnInit();
          } else {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: 'Error occured Please contact system adminstrator',
            });
          }
        });
      },
    });
  }
}
