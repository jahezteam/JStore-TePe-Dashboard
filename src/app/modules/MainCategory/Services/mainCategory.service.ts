import { Injectable } from '@angular/core';
import { permission } from '../../permissions/Models/permission';
import { mainCategory } from '../Models/mainCategory';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';

@Injectable({
  providedIn: 'root'
})
export class MainCategorysService {

  constructor(private ser:ApiCallerService) {
  }
  post(model:mainCategory){
    // let pers:per[]=[] as per[];
    // model.permissions.forEach(x=>{
    //   let per:per={} as per;
    //   per.id=x.id;
    //   per.name=x.name;
    //   pers.push(per);
    // })
    return this.ser.Create(model,"/MainCategory/CreateMainCategory");
  }
    getById(id:number){
      return this.ser.GetById("MainCategory/GetMainCategoryById",id);
  }
  getList(){
    return this.ser.GetWithFullUrl(environment.apiUrl+"/MainCategory/GetMainCategorys");
  }
  getPagination(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/MainCategory/GetAllPagging",isSearch);
  }
  getPaginationFilter(isActive:boolean,model:paginator){
    return this.ser.getFilterPagination("/MainCategory/GetFilteredPaginated?PageNumber="+model.pageNumber+"&PageSize="+model.pageSize+"&IsActive="+isActive);
  }
  search(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/MainCategory/SearchPagging",isSearch);
  }
  update(model:mainCategory){
    return this.ser.Update(model,"/MainCategory/UpdateMainCategory");
  }
  delete(id:number){
    return this.ser.DeleteWithQueryParam(id,"/MainCategory/DeleteMainCategory?Id="+id);
  }

}