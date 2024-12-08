import { Injectable } from '@angular/core';
import { permission } from '../../permissions/Models/permission';
import { role } from '../Models/role';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private ser:ApiCallerService) {
  }
  post(model:role){
    // let pers:per[]=[] as per[];
    // model.permissions.forEach(x=>{
    //   let per:per={} as per;
    //   per.id=x.id;
    //   per.name=x.name;
    //   pers.push(per);
    // })
    return this.ser.Create({"roleName":model.roleName,"permissions":model.permissions},"/Role/AddRole");
  }
    getById(id:number){
      return this.ser.GetById("Role/GetById",id);
  }
  getList(){
    return this.ser.GetWithFullUrl(environment.apiUrl+"/Role/GetRoles");
  }
  getPagination(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/Role/GetAllPagging",isSearch);
  }
  getPaginationFilter(isActive:boolean,model:paginator){
    return this.ser.getFilterPagination("/Role/GetFilteredPaginated?PageNumber="+model.pageNumber+"&PageSize="+model.pageSize+"&IsActive="+isActive);
  }
  search(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/Role/SearchRoles",isSearch);
  }
  update(model:role){
    return this.ser.Create({"roleId":model.id,"roleName":model.roleName,"permissions":model.permissions},"/Role/UpdateRole");
  }
  delete(id:number){
    return this.ser.DeleteWithQueryParam(id,"/Role/DeleteRole?RoleId="+id);
  }

}
// export interface per{
//   id:number;
//   name:string;
// }
