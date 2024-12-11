import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private ser: ApiCallerService) {}

  post(model: any) {
    return this.ser.Create(model, '/Newsletter/CreateNewsletter');
  }
  getById(id: number) {
    return this.ser.GetById('Newsletter/GetNewsletterById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/Newsletter/GetNewsletters');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Newsletter/GetAllPagging', isSearch);
  }
  getPaginationFilter(
    isActive: boolean,
    isDeleted: boolean,
    isSubScribe: boolean,
    model: any,
  ) {
    let url =
      '/Newsletter/GetFilteredPaginated?paggingParam.PageNumber=' +
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

    if (isSubScribe !== undefined) {
      url += `&isSubScribe=${isSubScribe}`;
    }
    return this.ser.getFilterPagination(url);
  }
  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Newsletter/SearchPagging', isSearch);
  }
  update(model: any) {
    return this.ser.Update(model, '/Newsletter/UpdateNewsletter');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/Newsletter/DeleteNewsletter?Id=' + id,
    );
  }
  toggleActive(id: number) {
    return this.ser.Update({ id }, '/NewsLetter/ChangeEmailActivate');
  }
  toggleSubscribe(id: number) {
    return this.ser.Update({ id }, '/NewsLetter/ChangeEmailSubScribed');
  }
}
