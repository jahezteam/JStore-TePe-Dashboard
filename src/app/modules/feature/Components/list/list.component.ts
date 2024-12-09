import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FeaturePermissions } from '../../Modals/feature-permissions';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { FeatureService } from '../../Services/feature.service';
import { Feature } from '../../Modals/feature';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { DetailsComponent } from '../details/details.component';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { FeatureType } from "../../../feature-type/Modals/feature-type";
import { PickListService } from "../../../../pages/shared-module/Services/pick-list.service";
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [MessageService, DialogService, ConfirmationService]

})
export class ListComponent {
  date: any;
  featurePermissions = FeaturePermissions;
  featureType: FeatureType[] = [] as FeatureType[];
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
    private service: FeatureService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private AuthService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService,
    private pickList:PickListService
  ) {}

  ngOnInit(): void {
    this.pickList.getFeatureTypes().subscribe(res=>{
      this.featureType=res;
      this.loadData();
      this.primengConfig.ripple = true;

    })
  }
  getFeatureType(id:any) {
    let item =this.featureType.filter(x=>x.id==id);
    return item![0]?.nameEn || ''
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
    this.router.navigateByUrl('/feature/add');
  }
  routeToEdit(id: any) {
    this.router.navigateByUrl('/feature/edit/' + id);
  }
  routeToDetails(id: any) {
    this.router.navigateByUrl('/feature/details/' + id);
  }

  openAddPopup() {
    this.ref = this.dialogService.open(CreateComponent, {
      header: 'Create Feature ',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: Feature) => {
      if (item != null) {
        this.service.post(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Feature  Created Succesfully',
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
  openEditPopup(item: Feature) {
    this.editRef = this.dialogService.open(UpdateComponent, {
      header: 'Edit Feature ',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.editRef.onClose.subscribe((item: Feature) => {
      if (item != null) {
        this.service.update(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Feature  updated Succesfully',
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
  openDetailsPopup(item: Feature) {
    this.refDetails = this.dialogService.open(DetailsComponent, {
      header: 'Feature  Details',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });
    this.refDetails.onClose.subscribe((item: Feature) => {
      if (item != null) {
      }
    });
  }

  filter: filter = {} as filter;
  reffilter: DynamicDialogRef = {} as DynamicDialogRef;

  openFilterPopup() {
    this.reffilter = this.dialogService.open(FilterComponent, {
      header: 'Filter Feature ',
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

  deleteItem(item: Feature) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete This Feature ',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Feature  Deleted Succesfully',
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

  protected readonly FeaturePermissions = FeaturePermissions;
}
