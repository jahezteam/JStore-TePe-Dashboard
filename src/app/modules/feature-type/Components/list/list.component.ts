import { ChangeDetectorRef, Component } from '@angular/core';
import { FeatureTypePermissions } from '../../Modals/feature-type-permissions';
import { environment } from '../../../../../environments/environment';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { FeatureTypeService } from '../../Services/feature-type.service';
import { FeatureType } from '../../Modals/feature-type';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { DetailsComponent } from '../details/details.component';
import { FilterComponent } from '../filter/filter.component';
import { filter } from 'app/pages/shared-module/Models/filterModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [MessageService, DialogService, ConfirmationService],
})
export class ListComponent {
  date: any;
  featureTypePermissions = FeatureTypePermissions;
  filteredDate: any;
  currentPage = 1;
  totalPages: number = 0;
  pager: number[] = [1];
  pageSize: number = environment.pageSize;
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
  ref: DynamicDialogRef = new DynamicDialogRef();
  editRef: DynamicDialogRef = {} as DynamicDialogRef;
  refDetails: DynamicDialogRef = {} as DynamicDialogRef;
  refFilter: DynamicDialogRef = {} as DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FeatureTypeService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private AuthService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

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

  routeToAdd() {
    this.router.navigateByUrl('/feature-type/add');
  }
  routeToEdit(id: any) {
    this.router.navigateByUrl('/feature-type/edit/' + id);
  }
  routeToDetails(id: any) {
    this.router.navigateByUrl('/feature-type/details/' + id);
  }

  openAddPopup() {
    this.ref = this.dialogService.open(CreateComponent, {
      header: 'Create Feature Type',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: FeatureType) => {
      if (item != null) {
        this.service.post(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Feature Type Created Succesfully',
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
  openEditPopup(item: FeatureType) {
    this.editRef = this.dialogService.open(UpdateComponent, {
      header: 'Edit Feature Type',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.editRef.onClose.subscribe((item: FeatureType) => {
      if (item != null) {
        this.service.update(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Feature Type updated Succesfully',
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
  openDetailsPopup(item: FeatureType) {
    this.refDetails = this.dialogService.open(DetailsComponent, {
      header: 'Feature Type Details',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });
    this.refDetails.onClose.subscribe((item: FeatureType) => {
      if (item != null) {
      }
    });
  }

  filter: filter = {} as filter;
  reffilter: DynamicDialogRef = {} as DynamicDialogRef;

  openFilterPopup() {
    this.reffilter = this.dialogService.open(FilterComponent, {
      header: 'Filter Feature Type',
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

  deleteItem(item: FeatureType) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete This Feature Type',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Feature Type Deleted Succesfully',
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

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
