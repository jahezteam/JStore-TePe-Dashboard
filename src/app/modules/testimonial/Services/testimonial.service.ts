import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { convertToFormData } from '../../../pages/shared-module/Models/convertToFormData';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private ser: ApiCallerService) {}

  post(model: any) {
    const formData = convertToFormData(model);
    return this.ser.CreateWithFile(formData, '/Testmonial/CreateTestmonial');
  }

  getById(id: number) {
    return this.ser.GetById('Testmonial/GetTestmonialById?Id=' + id, id);
  }

  getList() {
    return this.ser.GetWithFullUrl(
      environment.apiUrl + '/Testmonial/GetTestmonials',
    );
  }

  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Testmonial/GetAllPagging', isSearch);
  }

  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/Testmonial/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }

  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Testmonial/SearchPagging', isSearch);
  }

  update(model: any) {
    const formData = convertToFormData(model);
    return this.ser.UpdateFormData(formData, '/Testmonial/UpdateTestmonial');
  }

  delete(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/Testmonial/DeleteTestmonial?Id=' + id,
    );
  }
}
