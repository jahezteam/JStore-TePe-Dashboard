import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private ser: ApiCallerService) {}

  post(model: any) {
    return this.ser.Create(model, '/ContactUsMessage/CreateContactUsMessage');
  }

  getById(id: number) {
    return this.ser.GetById('ContactUsMessage/GetContactUsMessageById', id);
  }

  getList() {
    return this.ser.GetWithFullUrl('/ContactUsMessage/GetContactUsMessages');
  }

  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/ContactUsMessage/GetAllPagging',
      isSearch,
    );
  }

  getPaginationFilter(isActive: boolean, isDeleted: boolean, model: any) {
    let url =
      '/ContactUsMessage/GetFilteredPaginated?paggingParam.PageNumber=' +
      model.pageNumber +
      '&paggingParam.PageSize=' +
      model.pageSize;

    // Add parameters only if they have valid values
    if (isActive !== undefined) {
      url += `&IsActive=${isActive}`;
    }

    if (isDeleted !== undefined) {
      url += `&IsDeleted=${isDeleted}`;
    }

    return this.ser.getFilterPagination(url);
  }

  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/ContactUsMessage/SearchPagging',
      isSearch,
    );
  }

  update(model: any) {
    return this.ser.Update(model, '/ContactUsMessage/UpdateContactUsMessage');
  }

  delete(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/ContactUsMessage/DeleteContactUsMessage?Id=' + id,
    );
  }
}
