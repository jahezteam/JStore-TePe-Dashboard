import { Injectable } from '@angular/core';
import { permission } from '../../permissions/Models/permission';
import { category } from '../Models/category';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  constructor(private ser:ApiCallerService) {
  }
  post(model:category){
    // let pers:per[]=[] as per[];
    // model.permissions.forEach(x=>{
    //   let per:per={} as per;
    //   per.id=x.id;
    //   per.name=x.name;
    //   pers.push(per);
    // })
    return this.ser.Create(model,"/Category/CreateCategory");
  }
    getById(id:number){
      return this.ser.GetById("Category/GetCategoryById",id);
  }
  getList(){
    return this.ser.GetWithFullUrl(environment.apiUrl+"/Category/GetCategorys");
  }
  getPagination(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/Category/GetAllPagging",isSearch);
  }
  getPaginationFilter(isActive:boolean,model:paginator){
    return this.ser.getFilterPagination("/Category/GetFilteredPaginated?PageNumber="+model.pageNumber+"&PageSize="+model.pageSize+"&IsActive="+isActive);
  }
  search(model:paginator,isSearch:boolean=false){
    return this.ser.getPagination(model,"/Category/SearchPagging",isSearch);
  }
  update(model:category){
    return this.ser.Update(model,"/Category/UpdateCategory");
  }
  delete(id:number){
    return this.ser.DeleteWithQueryParam(id,"/Category/DeleteCategory?Id="+id);
  }

}
// export interface per{
//   id:number;
//   name:string;
// }
