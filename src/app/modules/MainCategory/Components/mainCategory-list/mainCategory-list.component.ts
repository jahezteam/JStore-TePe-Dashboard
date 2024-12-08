import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { mainCategory } from '../../Models/mainCategory';
import { mainCategoryPermissions } from '../../Models/mainCategoryPermissions';
import { MainCategorysService } from '../../Services/mainCategory.service';
import { CreateMainCategoryComponent } from '../create-mainCategory/create-mainCategory.component';
import { FilterMainCategorysComponent } from '../filter-mainCategory/filter-mainCategory.component';
import { MainCategoryDetailsComponent } from '../mainCategory-details/mainCategory-details.component';
import { UpdateMainCategoryComponent } from '../update-mainCategory/update-mainCategory.component';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';

@Component({
  selector: 'app-mainCategory-list',
  templateUrl: './mainCategory-list.component.html',
  styleUrls: ['./mainCategory-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class MainCategoryListComponent implements OnInit, OnDestroy {
  date: any
  mainCategoryPermissions = mainCategoryPermissions;
  paginator: paginator = {
    categoryId: 0,
    levelId: 0,
    pageNumber: 1,
    pageSize: environment.pageSize,
    questionTypeId: 0,
    searchText: '',
    sortingColumn: 'code',
    sortingType: 'asc'
  };
  filteredDate: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: MainCategorysService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private AuthService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  ngOnInit(): void {
    this.loadData();
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
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
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
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
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
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }

  routeToAdd() {
    this.router.navigateByUrl("/mainCategory/add");
  }
  routeToEdit(id: any) {
    this.router.navigateByUrl("/mainCategory/edit/" + id);
  }
  routeToDetails(id: any) {
    this.router.navigateByUrl("/mainCategory/details/" + id);

  }
  ref: DynamicDialogRef = new DynamicDialogRef;
  openAddPopup() {
    this.ref = this.dialogService.open(CreateMainCategoryComponent, {
      header: 'Create MainCategory',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((item: mainCategory) => {
      if (item != null) {
        this.service.post(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'MainCategory Created Succesfully' });
            this.ngOnInit();
          }
          else {
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
          }
        });

        this.changeDetection.detectChanges();
      }
    });
  }
  editRef: DynamicDialogRef = {} as DynamicDialogRef;
  openEditPopup(item: mainCategory) {
    this.editRef = this.dialogService.open(UpdateMainCategoryComponent, {
      header: 'Edit MainCategory',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: item
    });

    this.editRef.onClose.subscribe((item: mainCategory) => {
      if (item != null) {
        this.service.update(item).subscribe((res: any) => {
          if (res) {

            this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'MainCategory updated Succesfully' });
            this.ngOnInit();
          }
          else {
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
          }
        });

        this.changeDetection.detectChanges();
      }
    });
  }
  refDetails: DynamicDialogRef = {} as DynamicDialogRef;
  openDetailsPopup(item: mainCategory) {
    this.refDetails = this.dialogService.open(MainCategoryDetailsComponent, {
      header: 'MainCategory Details',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: item
    });
    this.refDetails.onClose.subscribe((item: mainCategory) => {
      if (item != null) {
      }
    });
  }
  filter: filter = {} as filter;
  reffilter: DynamicDialogRef = {} as DynamicDialogRef;
  openFilterPopup() {
    this.reffilter = this.dialogService.open(FilterMainCategorysComponent, {
      header: 'Filter MainCategory',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: this.filter
    });

    this.reffilter.onClose.subscribe((data: filter) => {
      if (data != null) {
        this.filter = data;
        this.paginator.pageNumber = 1;
        this.paginator.pageSize = environment.pageSize;
        this.paginator.searchText = '';
        this.paginator.sortingColumn = 'code';
        this.paginator.sortingType = 'asc';

        this.service.getPaginationFilter(this.filter.isActive, this.paginator).subscribe((res: any) => {
          if (res) {
            this.date = res.items as any;
            this.filteredDate = this.date;
            this.totalPages = res.totalPages
            this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
            this.changeDetection.detectChanges();
          }
          else {
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
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
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  deleteItem(item: mainCategory) {
    this.confirmationService.confirm({
      message: "Are you sure you want to Delete This MainCategory",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.delete(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'MainCategory Deleted Succesfully' });
            this.ngOnInit()
          }
          else {
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
          }
        });
      },
    });
  }
}
