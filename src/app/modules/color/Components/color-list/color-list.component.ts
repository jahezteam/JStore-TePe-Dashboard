import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { color } from '../../Models/color';
import { colorPermissions } from '../../Models/colorPermissions';
import { ColorsService } from '../../Services/color.service';
import { CreateColorComponent } from '../create-color/create-color.component';
import { FilterColorsComponent } from '../filter-color/filter-color.component';
import { ColorDetailsComponent } from '../color-details/color-details.component';
import { UpdateColorComponent } from '../update-color/update-color.component';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class ColorListComponent implements OnInit, OnDestroy {
  date: any
  colorPermissions = colorPermissions;
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
    private service: ColorsService,
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
    this.router.navigateByUrl("/color/add");
  }
  routeToEdit(id: any) {
    this.router.navigateByUrl("/color/edit/" + id);
  }
  routeToDetails(id: any) {
    this.router.navigateByUrl("/color/details/" + id);

  }
  ref: DynamicDialogRef = new DynamicDialogRef;
  openAddPopup() {
    this.ref = this.dialogService.open(CreateColorComponent, {
      header: 'Create Color',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((item: color) => {
      if (item != null) {
        this.service.post(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Color Created Succesfully' });
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
  openEditPopup(item: color) {
    this.editRef = this.dialogService.open(UpdateColorComponent, {
      header: 'Edit Color',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: item
    });

    this.editRef.onClose.subscribe((item: color) => {
      if (item != null) {
        this.service.update(item).subscribe((res: any) => {
          if (res) {

            this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Color updated Succesfully' });
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
  openDetailsPopup(item: color) {
    this.refDetails = this.dialogService.open(ColorDetailsComponent, {
      header: 'Color Details',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: item
    });
    this.refDetails.onClose.subscribe((item: color) => {
      if (item != null) {
      }
    });
  }
  filter: filter = {} as filter;
  reffilter: DynamicDialogRef = {} as DynamicDialogRef;
  openFilterPopup() {
    this.reffilter = this.dialogService.open(FilterColorsComponent, {
      header: 'Filter Color',
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
  deleteItem(item: color) {
    this.confirmationService.confirm({
      message: "Are you sure you want to Delete This Color",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.delete(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Color Deleted Succesfully' });
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
