import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { coupon } from '../../Models/Coupon';
import { CouponService } from '../../Services/coupon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { couponPermissions } from '../../Models/couponPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.scss'],
  providers: [ValidateService, MessageService, DialogService, ConfirmationService]

})
export class UpdateCouponComponent implements OnInit, OnDestroy {

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
  constructor(private validationService: ValidateService, private service: CouponService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig,
    private router: Router, public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
     private route: ActivatedRoute, private auth: AuthenticationService) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadPickLists();
    this.primengConfig.ripple = true;
  }
  getData(id: any) {
    this.service.getById(id).subscribe(res => {
      if (res) {
        this.form = res;
        this.registerForm();
        // this.loadImage(this.form.code);
        this.changeDetection.detectChanges();
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
  registerForm() {

    this.selectedType = this.types.find(x => x.id == this.form.type.toString()) as dropdown;
    this.selectedDiscountType = this.discountTypes.find(x => x.id == this.form.discountType.toString()) as dropdown;
this.form.expiryDate=new Date(this.form.expiryDate);

    this.formItems = ["code", "description", "amount", "expiryDate",
      "type", "discountType"];
    this.validationService.registerForm(this.formItems);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status)
    );
    this.validInput();
  }
  private validInput() {
    this.formItems.forEach(x => {
      this.isInputValid(x, true)
    })
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
    //     this.validatyPeriods = res.validatyPeriods
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
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  onseletedPacketChanged() {
    // if(this.selectedpackets.indexOf(this.selectedpacket)==-1)
    // {
    //   if(this.selectedpackets.length==100)
    //   {
    //     this.confirmationService.confirm({
    //       message: "Are you sure you want to add more than 5 Packets??",
    //       header: "Confirm",
    //       icon: "pi pi-exclamation-triangle",
    //       accept: () => {
    //         this.selectedpackets.push(this.selectedpacket);
    //       },
    //       reject:()=>{
    //       }
    //     });
    //     this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'you Added more than 5 Packets'});

    //   }else{
    //     this.selectedpackets.push(this.selectedpacket);

    //   }

    // }

    //   else{
    //     this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Packet added before'});
    //   }
  }
  onseletedTypeChanged() {
    // this.confirmationService.confirm({
    //   message: "Are you sure you want to change type? it cause to delete all Packets! press yes to change",
    //   header: "Confirm",
    //   icon: "pi pi-exclamation-triangle",
    //   accept: () => {
    //   this.deleteAll();
    //   },
    //   reject:()=>{
    //     //this.selectedType=this.type.find(x=>x.id==this.form.questionTypeId.toString()) as dropdown;
    //   }
    // });
  }
  onseletedCategoryChanged() {
    // this.confirmationService.confirm({
    //   message: "Are you sure you want to change Category? it cause to delete all Packets! press yes to change",
    //   header: "Confirm",
    //   icon: "pi pi-exclamation-triangle",
    //   accept: () => {
    //   this.deleteAll();
    //   },
    //   reject:()=>{
    //     this.selectedCategory=this.category.find(x=>x.id==this.form.categoryId.toString()) as dropdown;
    //   }
    // });
  }
  getValidation() {
    return !this.valid ;
  }
  // deleteItem(item:dropdown){
  //   if(item.id==this.selectedpacket.id)
  //   {
  //     this.selectedpacket={name:'',id:''};
  //   }
  //   let index=this.selectedpackets.indexOf(item);
  //   if(index!=-1)
  //   this.selectedpackets.splice(index,1);


  // }

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
  //       this.packets=res;
  //     }
  //     else{
  //       this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
  //     }
  //   });
  // }


  submit() {
    this.form.type = Number(this.selectedType?.id);
    this.form.discountType = Number(this.selectedDiscountType?.id);
    this.service.update(this.form).subscribe(res => {
      if (res) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'Coupon Updated Succesfully' });
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
}

