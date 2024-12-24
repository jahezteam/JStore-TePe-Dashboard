import { ChangeDetectorRef, Component } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  ProductFeatureTransfer,
  TransferPermissions,
} from '../../Models/transfer';
import { environment } from '../../../../../environments/environment';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';
import { TransferService } from '../../Services/transfer.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { CompleteTransferComponent } from '../complete-transfer/complete-transfer.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModuleModule],
  providers: [MessageService, DialogService, ConfirmationService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  data: ProductFeatureTransfer[] = [];
  selectedData: ProductFeatureTransfer[] = [] as ProductFeatureTransfer[];
  featureType: dropdown[] = [] as dropdown[];
  transferPermission = TransferPermissions;
  paginator: paginator = {
    categoryId: 0,
    levelId: 0,
    pageNumber: 1,
    pageSize: environment.pageSize,
    questionTypeId: 0,
    searchText: '*',
    sortingColumn: 'code',
    sortingType: 'asc',
  };
  searchVal: string = '';
  filteredDate: any;
  currentPage = 1;
  totalPages: number = 0;
  pager: number[] = [1];
  pageSize: number = environment.pageSize;
  ref: DynamicDialogRef = new DynamicDialogRef();
  filter: filter = {} as filter;
  refFilter: DynamicDialogRef = {} as DynamicDialogRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransferService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private AuthService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService,
    private pickList: PickListService,
  ) {}

  ngOnInit(): void {
    this.pickList.getFeatureTypes().subscribe((res: any) => {
      if (res) {
        this.featureType = res;
      }
    });
    this.getProductFromLocalStorage();
    this.loadData();
  }
  getProductFromLocalStorage() {
    const localStorageData = localStorage.getItem('selectedFeature') || '[]';
    if (localStorageData) {
      this.selectedData = JSON.parse(localStorageData);
    }
  }
  checkSelected(id: any) {
    return this.selectedData.find((item) => item.id === id);
  }
  handleSelectFeature(data: any) {
    if (data.quantity === 0) {
      this.messageService.add({
        key: 'tl',
        severity: 'error',
        summary: 'Error',
        detail: 'No quantity to transfer',
      });

      return;
    }
    const index = this.selectedData.findIndex((item) => item.id === data.id);
    if (index > -1) {
      this.selectedData.splice(index, 1);
      localStorage.setItem(
        'selectedFeature',
        JSON.stringify(this.selectedData),
      );
      return;
    }

    this.selectedData.push(data);
    localStorage.setItem('selectedFeature', JSON.stringify(this.selectedData));
  }
  getFeatureName(id: any) {
    return this.featureType
      .flatMap((item) => item.data)
      .find((dataItem) => dataItem?.id === id)?.name;
  }
  getFeatureNameEn(id: any) {
    return this.featureType
      .flatMap((item) => item.data)
      .find((dataItem) => dataItem?.id === id)?.nameEn;
  }
  loadData() {
    this.service.getPagination(this.paginator).subscribe((res: any) => {
      if (res) {
        this.data = res.items;
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
        this.data = res.items;
        this.filteredDate = this.data;
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
        this.data = res.items;
        this.filteredDate = this.data;
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
  openFilterPopup() {
    this.refFilter = this.dialogService.open(FilterComponent, {
      header: 'Filter Feature Type',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: this.filter,
    });

    this.refFilter.onClose.subscribe((data: filter) => {
      console.log('data', data);
      if (data === null) {
        this.loadData();
      }
      if (data != null) {
        this.filter = data;
        this.paginator.pageNumber = 1;
        this.paginator.pageSize = environment.pageSize;
        this.paginator.searchText = '';
        this.paginator.sortingColumn = 'code';
        this.paginator.sortingType = 'asc';

        this.service
          .getPaginationFilter(this.filter, this.paginator)
          .subscribe((res: any) => {
            if (res) {
              this.data = res.items as any;
              this.filteredDate = this.data;
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
        this.data = res.items;
        this.filteredDate = this.data;
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

  openTransferPopup() {
    this.ref = this.dialogService.open(CompleteTransferComponent, {
      header: 'Complete Transfer',
      width: '70%',
      contentStyle: { 'max-height': '750px', overflow: 'auto' },
      baseZIndex: 10000,
      data: this.selectedData,
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data != null) {
        this.service.transferProduct(data).subscribe(
          (res: any) => {
            if (res) {
              this.messageService.add({
                key: 'tl',
                severity: 'success',
                summary: 'Success',
                detail: 'Transfer Success',
              });
              this.selectedData = [];
              localStorage.setItem('selectedFeature', JSON.stringify([]));
              this.loadData();
            } else {
              this.messageService.add({
                key: 'tl',
                severity: 'error',
                summary: 'Error',
                detail: 'Error occurred Please contact system adminstrator',
              });
            }
          },
          (error) => {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: error.error.detail,
            });
          },
        );
        this.changeDetection.detectChanges();
      }
    });
  }
}
