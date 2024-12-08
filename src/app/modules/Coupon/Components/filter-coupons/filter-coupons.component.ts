import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { couponPermissions } from '../../Models/couponPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';
import { filterCoupon } from '../../Models/Coupon';

@Component({
  selector: 'app-filter-coupons',
  templateUrl: './filter-coupons.component.html',
  styleUrls: ['./filter-coupons.component.scss'],
  providers:[ValidateService,MessageService]

})
export class FilterCouponsComponent implements OnInit , OnDestroy {
  types:dropdown[]=[] as dropdown[];
  discountTypes:dropdown[]=[] as dropdown[];

  data:filterCoupon={} as filterCoupon;
  couponPermissions=couponPermissions;
    constructor(
      public config: DynamicDialogConfig,public ref:DynamicDialogRef,
   private auth:AuthenticationService) { }
    ngOnDestroy(): void {
      if (this.ref) {
        this.ref.close();
    }
    }

    ngOnInit(): void {
     this.loadPickLists();
     this.data=this.config.data;
    }

    loadPickLists(){
      this.types = [{id:'1',name:'Product Coupon'},{id:'2',name:'Cart Coupon'}];
      this.discountTypes =[{id:'1',name:'Discount Percentage'},{id:'2',name:'Discount Fixed Amount'}];

    }
    ok(){
       this.ref.close(this.data);
    }
    isAuth(per:string){
      return this.auth.isAuthorized(per);
    }
    close(){
      this.ref.close(null);
    }
    clearFilter(){
      this.data={isActive:true,isDeleted:false} as filterCoupon;
      this.ref.close(this.data)
    }

  }

