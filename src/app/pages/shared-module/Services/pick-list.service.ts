import { Injectable } from '@angular/core';
import { ApiCallerService } from './api-caller.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PickListService {

  constructor(private caller: ApiCallerService) {

  }
  apiUrl: string = environment.apiUrl;
  getMainCategories() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/Product/GetMainCategoryLookup");
  }
  getFeatureTypes() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/FeatureType/GetLookup");
  }
  getgroups() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/ImageGroup/GetGroupsLookup");
  }
  getTypes() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/types/getlist");
  }
  getLevels() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/levels/getlist");
  }
  getPermissions() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/Role/GetPermissionsLookup");
  }
  getRoles() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/Role/GetRolesLookup");
  }
  getUserRoles(id: any) {
    return this.caller.GetByIdQuesry(this.apiUrl + "/User/UerRoles?UserId=" + id);
  }

  getQuestionLookups() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/QuestionBank/GetQuestionBankLookups");
  }
  getPackageLookups() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/Product/GetProductLookups");
  }
  getPackageLookupsForCoupons(couponId: number, type: number) {
    return this.caller.GetWithFullUrl(this.apiUrl + "/Product/getProductLookupsForCoupons/" + couponId + "/" + type);
  }
  getUserLookups() {
    return this.caller.GetWithFullUrl(this.apiUrl + "/User/GetUserLookups");
  }
  getUserLookupsForPackage(pid: number, type: number) {
    return this.caller.GetWithFullUrl(this.apiUrl + "/User/getUserLookupsForPackage/" + pid + "/" + type);
  }
}

