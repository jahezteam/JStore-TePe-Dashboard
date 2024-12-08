import { Injectable } from '@angular/core';
import { permission } from '../../permissions/Models/permission';
import { color } from '../Models/color';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private ser:ApiCallerService) {
  }
  post(model:color){
    // let pers:per[]=[] as per[];
    // model.permissions.forEach(x=>{
    //   let per:per={} as per;
    //   per.id=x.id;
    //   per.name=x.name;
    //   pers.push(per);
    // })
    return this.ser.Create(model,"/Color/CreateColor");
  }
    getById(id:number){
      return this.ser.GetById("Color/GetColorById",id);
  }
  getList(){
    return this.ser.GetWithFullUrl(environment.apiUrl+"/Color/GetColors");
  }
  getPagination(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/Color/GetAllPagging",isSearch);
  }
  getPaginationFilter(isActive:boolean,model:paginator){
    return this.ser.getFilterPagination("/Color/GetFilteredPaginated?PageNumber="+model.pageNumber+"&PageSize="+model.pageSize+"&IsActive="+isActive);
  }
  search(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/Color/SearchPagging",isSearch);
  }
  update(model:color){
    return this.ser.Update(model,"/Color/UpdateColor");
  }
  delete(id:number){
    return this.ser.DeleteWithQueryParam(id,"/Color/DeleteColor?Id="+id);
  }

}