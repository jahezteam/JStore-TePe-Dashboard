import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { coupon } from '../../Models/Coupon';
import { CouponService } from '../../Services/coupon.service';
import { Router } from '@angular/router';
import { couponPermissions } from '../../Models/couponPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
  providers: [ValidateService, MessageService, DialogService, ConfirmationService]

})
export class CreateCouponComponent implements OnInit, OnDestroy {
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
  constructor(private validationService: ValidateService, private service: CouponService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig,
    private router: Router, public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef, private picklistService: PickListService,
    private confirmationService: ConfirmationService, private auth: AuthenticationService) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.registerForm();
    this.loadPickLists();
    this.primengConfig.ripple = true;
  }
  routrToList() {
    this.router.navigateByUrl("/coupon/list");
  }
  registerForm() {
    this.selectedType = {} as dropdown;;
    this.selectedDiscountType = {} as dropdown;;


    this.validationService.registerForm(["code", "description", "type", "discountType",
      "amount", "expiryDate"]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status)
    );
  }
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
  loadPickLists() {
    // this.picklistService.getPackageLookups().subscribe(res => {
    //   if (res) {
    //     // this.category=res.categories;
    //     // this.type=res.questionTypes;
    //     this.Packets = res.packets;
    //     this.validatyPeriods = res.validatyPeriods
    //   }
    //   else {
    //     this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
    //   }
    // });
    this.types = [{id:'1',name:'Product Coupon'},{id:'2',name:'Cart Coupon'}];
    this.discountTypes =[{id:'1',name:'Discount Percentage'},{id:'2',name:'Discount Fixed Amount'}];
  }
  isInputValid(name: string, status: boolean) {

    this.validationService.updateFormFlag(name, status);
  }
  // onChanged(){
  //   if(this.selectedCategory?.id=='')
  //   {
  //     return;
  //   }
  //   if(this.selectedType?.id=='')
  //   {
  //     return;
  //   }
  //   this.service.getFilteredPackets(Number(this.selectedType.id),Number(this.selectedCategory.id)).subscribe(res=>{
  //     if(res)
  //     {
  //       this.Packets=res;
  //     }
  //     else{
  //       this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
  //     }
  //   });
  // }
  onseletedPacketChanged() {
    // if(this.selectedPackets.indexOf(this.selectedPacket)==-1)
    // {
    //   if(this.selectedPackets.length==5)
    //   {
    //     this.confirmationService.confirm({
    //       message: "Are you sure you want to add more than 5 Packets??",
    //       header: "Confirm",
    //       icon: "pi pi-exclamation-triangle",
    //       accept: () => {
    //         this.selectedPackets.push(this.selectedPacket);
    //       },
    //       reject:()=>{
    //       }
    //     });
    //     this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'you Added more than 5 Packets'});

    //   }
    //   else{
    //     this.selectedPackets.push(this.selectedPacket);

    //   }
    // }

    //   else{
    //     this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Packet added before'});
    //   }
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  getValidation() {
    return !this.valid ;
  }
  // deleteItem(item:dropdown){
  //   if(item.id==this.selectedPacket.id)
  //   {
  //     this.selectedPacket={name:'',id:''};
  //   }
  //   let index=this.selectedPackets.indexOf(item);
  //   if(index!=-1)
  //   this.selectedPackets.splice(index,1);


  // }


  submit() {

    this.form.type = Number(this.selectedType.id);
    this.form.discountType = Number(this.selectedDiscountType.id);

    const formData = new FormData();
    formData.append('command', JSON.stringify(this.form));

    this.service.post(this.form).subscribe(res => {
      if (res) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'Coupon Created Succesfully' });
        this.clearInputs();
        this.registerForm();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  clearInputs() {
    this.valid = false;

    this.selectedDiscountType = {} as dropdown;
    this.selectedType = {} as dropdown;

    this.form = {
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
    this.changeDetection.detectChanges();
    this.ngOnInit()
  }
  reset() {
    this.clearInputs();
  }

}

