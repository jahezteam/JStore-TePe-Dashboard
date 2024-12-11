import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterProductComponent } from '../filter-product/filter-product.component';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { environment } from '../../../../../environments/environment';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { product } from '../../Models/product';
import { ProductPermissions } from '../../Models/productPermissions';
import { ProductService } from '../../Services/product.service';
import { picklist } from 'app/pages/shared-module/Models/pickList';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],

  providers: [MessageService, DialogService, ConfirmationService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  data: product[] = [];

  ProductPermission = ProductPermissions;
  paginator: paginator = {
    categoryId: 0,
    levelId: 0,
    pageNumber: 1,
    pageSize: environment.pageSize,
    questionTypeId: 0,
    searchText: '*',
    sortingColumn: 'code',
    sortingType: 'asc'
  };
  searchVal: string = '';

  filteredDate: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private service: ProductService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig,
    public dialogService: DialogService, private changeDetection: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private picklistService: PickListService,
    private auth: AuthenticationService) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.paginator.searchText = this.route.snapshot.paramMap.get('searchValue')!;
    this.searchVal = this.paginator.searchText == '*' ? '' : this.paginator.searchText;
    this.searchInput();
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
        this.data = res.items as product[];
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
    this.service.getPagination(this.paginator).subscribe((res: any) => {
      if (res) {
        this.data = res.items as product[];
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
  loadData() {
    this.service.getPagination(this.paginator).subscribe((res: any) => {
      if (res) {
        this.data = res.items as product[];
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
  routeToAdd() {
    this.router.navigateByUrl("/product/add");
  }
  routeToEdit(id: number) {
    this.router.navigateByUrl("/product/edit/" + id + "/" + this.paginator.searchText);
  }
  routeToDetails(id: number) {
    this.router.navigateByUrl("/product/details/" + id + "/" + this.paginator.searchText);
  }
  mainCategories: picklist[] = [] as picklist[];
  categories: picklist[] = [] as picklist[];
  selectedCategory: picklist = {} as picklist;
  selectedMainCategory: picklist = {} as picklist;
  getCategory(categoryId: string) {
    this.picklistService.getMainCategories().subscribe((res: any) => {
      this.categories = res.data ;
    })
    if(this.categories){
      return this.categories?.filter(x => x.id == categoryId)[0]?.name;
    }
    return '';

  }
  ref: DynamicDialogRef = new DynamicDialogRef;

  filter: filter = { isActive: true, isDeleted: false } as filter;
  openFilterPopup() {
    this.ref = this.dialogService.open(FilterProductComponent, {
      header: 'Filter Products',
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: this.filter
    });

    this.ref.onClose.subscribe((data: filter) => {
      if (data != null) {
        this.filter = data;
        // this.paginator.levelId = 0;//(data.difficult != undefined) ? Number(this.filter.difficult.id) : 0;
        this.paginator.pageNumber = 1;
        this.paginator.pageSize = environment.pageSize;
        this.paginator.searchText = '';
        this.paginator.sortingColumn = 'code';
        this.paginator.sortingType = 'asc';
        this.service.getPaginationFilter(this.paginator, this.filter).subscribe((res: any) => {
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
  searchInput(event: any = null) {
    this.paginator.categoryId = 0;
    this.paginator.questionTypeId = 0;
    this.paginator.levelId = 0;
    this.paginator.pageNumber = 1;
    this.paginator.pageSize = environment.pageSize;
    if (event != null)
      this.paginator.searchText = event.target.value;
    this.paginator.sortingColumn = 'code';
    this.paginator.sortingType = 'asc';
    if (this.paginator.searchText == '' || this.paginator.searchText == '*') {
      this.loadData();
      return;
    }
    this.service.search(this.paginator, true).subscribe((res: any) => {
      if (res) {
        this.data = res.items as product[];
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
  isDiscountExist(item: any) {
    return item?.price != item?.discountedPrice;
  }
  delete(id: number) {
    this.service.delete(id).subscribe((res: any) => {
      if (res.succeeded) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'success', detail: 'Product Deleted Succesfully' });
        this.loadData();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  deleteItem(item: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to Delete This Product",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.delete(item.id);
      },
    });

  }

}
