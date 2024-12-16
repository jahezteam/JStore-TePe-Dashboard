import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { convertToFormData } from '../../../pages/shared-module/Models/convertToFormData';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private ser: ApiCallerService) {}

  post(model: any) {
    const formData = new FormData();

    return this.ser.CreateWithFile(
      convertToFormData(model, formData),
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
    const formData = new FormData();

    return this.ser.Update(
      convertToFormData(model, formData),
      '/Branch/UpdateBranch',
    );
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/Branch/DeleteBranch?Id=' + id);
  }

  assignToMainBranch(id: any) {
    return this.ser.Update({ id }, '/Branch/ChangePrimaryBranch');
  }
}
