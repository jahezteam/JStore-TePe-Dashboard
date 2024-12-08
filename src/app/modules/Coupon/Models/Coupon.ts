import { dropdown } from "app/pages/shared-module/Models/dropDown";

export interface coupon{
      id:number; 
      code:string; 
      description :string;
      type :number;
      discountType :number;
      amount :number;
      expiryDate :Date;
      isActive:boolean,
      isDeleted:boolean
      productCoupons:any;
}
export interface filterCoupon{
      isActive:boolean;
      isDeleted:boolean;
      type:dropdown;
      discountType:dropdown;
  }