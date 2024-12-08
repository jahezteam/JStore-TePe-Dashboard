import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { coupon } from '../../Models/Coupon';
import { CouponService } from '../../Services/coupon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { couponPermissions } from '../../Models/couponPermissions';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]

})
export class CouponDetailsComponent implements OnInit, OnDestroy {
  id: any = 0;

  valid = false;
  // category:dropdown[]=[] as dropdown[];
  // type:dropdown[]=[] as dropdown[];
  types: dropdown[] = [] as dropdown[];
  discountTypes: dropdown[] = [] as dropdown[];


  selectedType: dropdown = {} as dropdown;
  selectedDiscountType: dropdown = {} as dropdown;

  couponPermissions = couponPermissions;

  form: coupon = {
    id: 0,
    code: '',
    description: '',
    type: 1,
    discountType: 1,
    amount: 0,
    isActive: true,
    isDeleted: false,
    expiryDate: new Date(Date.now()),
    productCoupons:[]

  };
  constructor(private service: CouponService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig,
    private router: Router, public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private picklistService: PickListService,
    private confirmationService: ConfirmationService, private route: ActivatedRoute, private auth: AuthenticationService) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.loadPickLists();
  }
  getData(id: any) {
    this.service.getById(id).subscribe(res => {
      if (res) {
        this.form = res;
        this.selectedType = this.types.find(x => x.id == this.form.type.toString()) as dropdown;
        this.selectedDiscountType = this.discountTypes.find(x => x.id == this.form.discountType.toString()) as dropdown;
    this.form.expiryDate=new Date(this.form.expiryDate);
        this.changeDetection.detectChanges();
        this.primengConfig.ripple = true;

      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }

  routrToList() {
    this.router.navigateByUrl("/coupon/list");
  }
  formItems: string[] = [];

  // ref: DynamicDialogRef;
  // routeToDetails(item: dropdown) {
  //   this.ref = this.dialogService.open(PacketDetailsPopupComponent, {
  //     header: 'Packet Details',
  //     width: '80%',
  //     contentStyle: { "max-height": "550px", "overflow": "auto" },
  //     baseZIndex: 10000,
  //     data: item.id
  //   });

  //   this.ref.onClose.subscribe(() => {
  //   });
  // }
  // routeToDetails(item:dropdown)
  // {
  //   this.router.navigateByUrl("/question/details/" + item.id);
  // }
  loadPickLists() {
    // this.picklistService.getPackageLookups().subscribe(res => {
    //   if (res) {
    //     // this.category=res.categories;
    //     // this.type=res.questionTypes;
    //     this.packets = res.packets;
    //     this.validatyPeriods = res.validatyPeriods;

    //     this.getData(this.id);
    //   }
    //   else {
    //     this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
    //   }
    // });
    this.types = [{id:'1',name:'Package Coupon'},{id:'2',name:'Cart Coupon'}];
    this.discountTypes =[{id:'1',name:'Discount Percentage'},{id:'2',name:'Discount Fixed Amount'}];
         this.getData(this.id);

  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
}

