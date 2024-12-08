import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { coupon, filterCoupon } from '../../Models/Coupon';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from '../../Services/coupon.service';
import { FilterCouponsComponent } from '../filter-coupons/filter-coupons.component';
import { AssignPackagesToCouponComponent } from '../assign-packages-to-coupon/assign-packages-to-coupon.component';
import { couponPermissions } from '../../Models/couponPermissions';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { environment } from '../../../../../environments/environment';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]

})
export class CouponListComponent implements OnInit, OnDestroy {
  data: coupon[] = [];

  couponPermissions = couponPermissions;
  // filter: filter = {} as filter;
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
  discountTypes: dropdown[] = [] as dropdown[];
  types: dropdown[] = [] as dropdown[];
  constructor(private route: ActivatedRoute, private router: Router, private service: CouponService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig,
    public dialogService: DialogService, private changeDetection: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private picklistService: PickListService,
    private auth: AuthenticationService) { }
  ngOnDestroy(): void {
    // if (this.ref) {
    //   this.ref.close();
    // }

  }

  ngOnInit(): void {
    this.loadPickLists();
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

    this.service.getPagination(this.paginator).subscribe(res => {

      if (res) {
        this.data = res.items as coupon[];
        this.filteredDate = this.data;

        this.totalPages = res.totalPages
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
    this.service.getPagination(this.paginator).subscribe(res => {
      if (res) {
        this.data = res.items as coupon[];
        this.filteredDate = this.data;

        this.totalPages = res.totalPages
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);

        this.changeDetection.detectChanges();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });

  }
  currentPage = 1;
  totalPages: number = 0;
  pager: number[] = [1];
  pageSize: number = environment.pageSize;

  // selectedValidatyPeriod: dropdown = {} as dropdown;
  loadData() {
    this.service.getPagination(this.paginator).subscribe(res => {
      if (res) {
        this.data = res.items as coupon[];
        this.filteredDate = this.data;
        this.totalPages = res.totalPages
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);

        this.changeDetection.detectChanges();


      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  // validatyPeriods: dropdown[] = [] as dropdown[];

  getValidaty(id: string) {
    // return this.validatyPeriods.find(x => x.id == id)?.name;
  }
  loadPickLists() {
    this.types = [{id:'1',name:'Product Coupon'},{id:'2',name:'Cart Coupon'}];
    this.discountTypes =[{id:'1',name:'Discount Percentage'},{id:'2',name:'Discount Fixed Amount'}];
    this.loadData();
    // this.picklistService.getPackageLookups().subscribe(res => {
    //   if (res) {
    //     // this.category = res.categories;
    //     // this.type = res.questionTypes;
    //     // this.type = res.questionTypes;
    //     // this.validatyPeriods = res.validatyPeriods

    //     this.loadData();
    //   }
    //   else {
    //     this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
    //   }
    // });

  }
  assignPackageRef: DynamicDialogRef = new DynamicDialogRef;
  AssignPackage(item: any) {
    this.assignPackageRef = this.dialogService.open(AssignPackagesToCouponComponent, {
      header: 'Assign Product to Coupon',
      width: '50%',
      height:'75%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: { type: "Assign", pid: item.id }
    });
    this.assignPackageRef.onClose.subscribe((model: dropdown[]) => {
      if (model != null && model.length > 0) {
        let listIds: string[] = [] as string[];
        model.forEach(item => {
          listIds.push(item.id);
        });
        this.service.AssignToPackage(item.id, listIds).subscribe(
          res => {
            if (res.succeeded) {
              this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Product Assigned Succesfully' });
              setTimeout(() => {
                this.ngOnInit();
              }, 200);

            }
            else {
              this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
            }
          },
          error => {
            this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
          },);

        this.changeDetection.detectChanges();
      }
    });
  }
  RemovePackageFromCouponRef: DynamicDialogRef = new DynamicDialogRef;
  RemovePackageFromCoupon(item: any) {
    this.RemovePackageFromCouponRef = this.dialogService.open(AssignPackagesToCouponComponent, {
      header: 'Remove Products From Coupon',
      width: '50%',
      height:'75%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: { type: "Remove", pid: item.id }
    });
    this.RemovePackageFromCouponRef.onClose.subscribe((model: dropdown[]) => {
      if (model != null && model.length > 0) {
        let listIds: string[] = [] as string[];
        model.forEach(item => {
          listIds.push(item.id);
        });
        this.service.RemoveFromPackage(item.id, listIds).subscribe(
          res => {
            if (res.succeeded) {
              this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Products Removed Succesfully' });
              setTimeout(() => {
                this.ngOnInit();
              }, 200);
            }
            else {
              this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
            }
          },
          error => {
            this.messageService.add({ key: 'tl', severity: 'warn', summary: 'warn', detail: 'Product Already Assigned' });
          },);

        this.changeDetection.detectChanges();
      }
    });
  }
  routeToAdd() {
    this.router.navigateByUrl("/coupon/add");
  }
  routeToEdit(id: number) {
    this.router.navigateByUrl("/coupon/edit/" + id);
  }
  routeToDetails(id: number) {
    this.router.navigateByUrl("/coupon/details/" + id);
  }

  ref: DynamicDialogRef = new DynamicDialogRef;

  filter: filterCoupon = { isActive: true, isDeleted: false } as filterCoupon;
  openFilterPopup() {
    this.ref = this.dialogService.open(FilterCouponsComponent, {
      header: 'Filter Coupons',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: this.filter
    });

    this.ref.onClose.subscribe((data: filterCoupon) => {
      if (data != null) {
        this.filter = data;
        // this.paginator.categoryId =0;//= (data.category != undefined) ? Number(this.filter.category.id) : 0;
        // this.paginator.questionTypeId=0;// = (data.type != undefined) ? Number(this.filter.type.id) : 0;
        // this.paginator.levelId = 0;//(data.difficult != undefined) ? Number(this.filter.difficult.id) : 0;
        this.paginator.pageNumber = 1;
        this.paginator.pageSize = environment.pageSize;
        this.paginator.searchText = '';
        this.paginator.sortingColumn = 'code';
        this.paginator.sortingType = 'asc';
        // let id = (data.validaty != undefined) ? Number(this.filter.validaty?.id) : 0;
        this.service.getPaginationFilter(this.paginator, this.filter).subscribe(res => {
          if (res) {
            this.data = res.items as any;
            this.filteredDate = this.data;
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
    this.paginator.categoryId = 0;
    this.paginator.questionTypeId = 0;
    this.paginator.levelId = 0;
    this.paginator.pageNumber = 1;
    this.paginator.pageSize = environment.pageSize;
    this.paginator.searchText = event.target.value;
    this.paginator.sortingColumn = 'code';
    this.paginator.sortingType = 'asc';
    if (this.paginator.searchText == '') {
      this.loadData();
      return;
    }
    //   this.paginator.searchText=event?.target?.value;
    //  this.filteredDate=this.date.filter(item=>item.case.search(new RegExp(event.target.value, 'i')) > -1);
    this.service.search(this.paginator, true).subscribe(res => {
      if (res) {
        this.data = res.items as coupon[];
        this.filteredDate = this.data;
        this.totalPages = res.totalPages
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });

  }
  delete(id: number) {
    this.service.delete(id).subscribe(res => {
      if (res.succeeded) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Coupon Deleted Succesfully' });
        this.loadData();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  deleteItem(item: any) {
                this.delete(item.id);

    // this.service.checkAssigned(item.id).subscribe(res => {
    //   if (res) {
    //     this.confirmationService.confirm({
    //       message: "This Package is assigned to Users do you still want to remove it.",
    //       header: "Confirm",
    //       icon: "pi pi-exclamation-triangle",
    //       accept: () => {
    //         this.delete(item.id);
    //       },
    //     });
    //   }
    //   else {
    //     this.confirmationService.confirm({
    //       message: "Are you sure you want to Delete This Package",
    //       header: "Confirm",
    //       icon: "pi pi-exclamation-triangle",
    //       accept: () => {
    //         this.delete(item.id);
    //       },
    //     });
    //   }
    // });

  }
  getType(id: string) {
    return this.types.find(x => x.id == id)?.name;
  }
  getDiscountType(id: string) {
    return this.discountTypes.find(x => x.id == id)?.name;
  }
}
