import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private ser: ApiCallerService) {}
  getFormData(model: any) {
    const formData = new FormData();
    formData.append('name', model.name);
    formData.append('nameEn', model.nameEn);
    formData.append('unifiedNumber', model.unifiedNumber);
    formData.append('fax', model.fax);
    formData.append('phone', model.phone);
    formData.append('email', model.email);
    formData.append('mobile', model.mobile);
    formData.append('address', model.address);
    formData.append('addressEn', model.addressEn);
    formData.append('lat', model.lat);
    formData.append('long', model.long);
    formData.append('isPrimary', model.isPrimary);
    return formData;
  }

  post(model: any) {
    return this.ser.CreateWithFile(
      this.getFormData(model),
      '/Branch/CreateBranch',
    );
  }
  getById(id: number) {
    return this.ser.GetById('Branch/GetBranchById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/Branch/GetBranches');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser
      .getPagination(model, '/Branch/GetAllPagging', isSearch)
      .pipe();
  }
  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/Branch/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Branch/SearchPagging', isSearch);
  }
  update(model: any) {
    return this.ser.Update(this.getFormData(model), '/Branch/UpdateBranch');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/Branch/DeleteBranch?Id=' + id);
  }

  assignToMainBranch(id: any) {
    return this.ser.Update({ id }, '/Branch/ChangePrimaryBranch');
  }
}
