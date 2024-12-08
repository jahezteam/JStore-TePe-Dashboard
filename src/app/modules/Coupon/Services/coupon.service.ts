import { Injectable } from '@angular/core';
import { coupon, filterCoupon } from '../Models/Coupon';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';
@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private ser: ApiCallerService) {
  }
  post(model: coupon) {
    return this.ser.Create(model, "/Coupon/CreateCoupon");
  }
  AssignToPackage(pid: number, uids: string[]) {
    var model = {
      couponId: pid,
      productIds: uids
    }
    return this.ser.Create(model, "/Coupon/AssignCouponToProducts");
  }
  RemoveFromPackage(pid: number, uids: string[]) {
    var model = {
      couponId: pid,
      productIds: uids
    }
    return this.ser.Create(model, "/Coupon/RemoveProductFromCoupon");
  }
  // postFormData(model: FormData) {
  //   return this.ser.CreateWithFile(model, "/Package/CreatePackage");
  // }
  getById(id: number) {
    return this.ser.GetById("/Coupon/GetCouponById?Id=" + id, id);
  }
  getByCodecode(code: string) {
    return this.ser.GetById("/Coupon/GetCouponByCode?Code=" + code, code);
  }
  // getByCode(code: string) {
  //   return this.ser.GetWithFullUrl(environment.apiUrl + "/Coupon/GetCoupons");
  // }
  getList() {
    return this.ser.GetWithFullUrl(environment.apiUrl + "/Coupon/GetCoupons");
  }
  getPagination(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, "/Coupon/GetAllPagging", isSearch);
  }
  // getStudentPagination(model: paginator, isSearch: boolean = false) {
  //   return this.ser.getPagination(model, "/Coupon/GetAllStudentPagging", isSearch);
  // }
  // getStudentpackages(userId: number) {
  //   return this.ser.GetWithFullUrl(environment.apiUrl + "/Package/GetAllCandidatePackages/" + userId);
  // }
  // getStudentTop5packages(userId: number) {
  //   return this.ser.GetWithFullUrl(environment.apiUrl + "/Package/GetTop5/" + userId);
  // }
  getPaginationFilter(model: paginator, filter: filterCoupon) {
    return this.ser.getFilterPagination("/Coupon/GetFilteredPaginated?paggingParam.PageNumber=" + model.pageNumber + "&paggingParam.PageSize=" + model.pageSize + "&type=" + filter.type.id + "&discountType=" + filter.discountType.id + "&IsActive=" + filter.isActive + "&IsDeleted=" + filter.isDeleted);
  }
  // checkAssigned(id: number) {
  //   return this.ser.GetWithFullUrl(environment.apiUrl + "/Package/CheckStatus/" + id);
  // }
  search(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, "/Coupon/SearchPagging", isSearch);
  }
  update(model: coupon) {
    return this.ser.Update(model, "/Coupon/UpdateCoupon");
  }
  // updateFormData(model: FormData) {
  //   return this.ser.UpdateFormData(model, "/Package/UpdatePackage");
  // }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, "/Coupon/DeleteCoupon?Id=" + id);
  }
  // getFilteredPackets(type: number, category: number) {
  //   return this.ser.GetWithFullUrl(environment.apiUrl + "/Packet/" + type + "/" + category);
  // }
  // getImage(code: string) {
  //   return this.ser.GetImagesWithFullUrl(environment.apiUrl + "/Package/GetImage/" + code);
  // }
}
