import { Injectable } from '@angular/core';
import { systemUser, user } from '../Models/user';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { paginator } from '../../../pages/shared-module/Models/Paginator';
import { environment } from '../../../../environments/environment';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private ser: ApiCallerService) {
  }
  post(model: systemUser) {
    return this.ser.Create(model, "/User/AddUser");
  }
  postFormdata(model: FormData) {
    return this.ser.CreateWithFile(model, "/User/AddUser");
  }
  getPagination(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, "/User/GetAllPagging");
  }
  getPaginationFilter(isActive: boolean, model: paginator) {
    return this.ser.getFilterPagination("/User/GetFilteredPaginated?PageNumber=" + model.pageNumber + "&PageSize=" + model.pageSize + "&IsActive=" + isActive);
  }
  search(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, "/User/SearchUsers", isSearch);
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, "/User/DeleteUser/?UserId=" + id);
  }
  changePassword(data: any) {
    return this.ser.Create(data, "/User/ChangeUserPassword");
  }
  getById(id: number) {
    return this.ser.GetByIdQuesry("/User/GetUserById?UserId=" + id);
  }
  getList() {
    return this.ser.GetWithFullUrl("/user/list");
  }
  getAdminDashboardUserData() {
    return this.ser.GetWithFullUrl(environment.apiUrl +"/user/GetAdminDashboardData");
  }
  assignToRoles(id: any, data: dropdown[]) {
    let body = {
      "userId": id,
      "roles": data,
      "permissions": []
    };
    return this.ser.Create(body, "/User/AddToRoles");
  }
  changeImage(data: FormData) {
    return this.ser.CreateWithFile(data, "/User/ChangeUserImage");
  }
  removeFromRoles(id: any, data: dropdown[]) {
    let body = {
      "userId": id,
      "roles": data
    };
    return this.ser.Create(body, "/User/RemoveFromRoles");
  }

  update(model: systemUser) {
    return this.ser.Create(model, "/User/UpdateUser");
  }
  updateFormData(model: FormData) {
    return this.ser.CreateWithFile(model, "/User/UpdateUser");
  }
  getImage(userName: string) {
    return this.ser.GetImagesWithFullUrl(environment.apiUrl + "/User/" + userName);
  }
  exportData(){
      let url = environment.apiUrl +"/Export/GetExcelData"
      return this.ser.GetImagesWithFullUrl(url);
    }
    download(data: any) {
      const blob = new Blob([data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }
    exportUserNationalitiesData(){
      let url = environment.apiUrl +"/Export/GetUserNationalitiesExcelData"
      return this.ser.GetImagesWithFullUrl(url);
    }
    exportUsersJoinedLAst6Months(){
      let url = environment.apiUrl +"/Export/GetUsersJoindLast6Months"
      return this.ser.GetImagesWithFullUrl(url);
    }
    exportUsersSubscription(){
      let url = environment.apiUrl +"/Export/GetUserSubscribedOrNot"
      return this.ser.GetImagesWithFullUrl(url);
    }
    GetUsersLoggedInLAstWeek(){
      let url = environment.apiUrl +"/Export/GetUsersLoggedInLAstWeek"
      return this.ser.GetImagesWithFullUrl(url);
    }



}
