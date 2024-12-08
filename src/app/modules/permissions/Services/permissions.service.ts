import { Injectable } from '@angular/core';
import { permission } from '../Models/permission';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { paginator } from '../../../pages/shared-module/Models/Paginator';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {


  constructor(private ser:ApiCallerService) {
  }
  post(model:permission){
    return this.ser.Create(model,"permission/addpermission");
  }
    getById(id:number){
      return this.ser.GetById("permission/getbyid",id);
  }
  getList(){
    return this.ser.GetWithFullUrl("permission/getlist");
  }
  getPagination(model:paginator){
    return this.ser.getPaginationData(model,"permission/get");
  }
  update(model:permission){
    return this.ser.Update(model,"permission/update");
  }
  delete(id:number){
    return this.ser.Delete(id,"permission/delete");
  }
}
