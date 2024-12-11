import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { product } from '../Models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private ser: ApiCallerService) {}

  post(model: product) {
    return this.ser.Create(model, '/Product/CreateProduct');
  }
  postFormData(model: FormData) {
    return this.ser.CreateWithFile(model, '/Product/CreateProduct');
  }
  getById(id: number) {
    return this.ser.GetById('/Product/GetCategoryById?Id=' + id, id);
  }
  getList() {
    return this.ser.GetWithFullUrl(environment.apiUrl + '/Product/GetProducts');
  }
  GetProductLookups() {
    return this.ser.GetWithFullUrl(
      environment.apiUrl + '/Product/GetProductLookups',
    );
  }
  getPagination(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Product/GetAllPagging', isSearch);
  }
  getPaginationFilter(model: paginator, filter: filter) {
    return this.ser.getFilterPagination(
      '/Product/GetFilteredPaginated?paggingParam.PageNumber=' +
        model.pageNumber +
        '&paggingParam.PageSize=' +
        model.pageSize +
        '&IsActive=' +
        filter.isActive +
        '&IsDeleted=' +
        filter.isDeleted,
    );
  }
  search(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Product/SearchPagging', isSearch);
  }
  update(model: product) {
    return this.ser.Update(model, '/Product/UpdateProduct');
  }
  updateFormData(model: FormData) {
    return this.ser.UpdateFormData(model, '/Product/UpdateProduct');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/Product/DeleteProduct?Id=' + id);
  }
  getImage(code: string) {
    return this.ser.GetImagesWithFullUrl(
      environment.apiUrl + '/Product/GetImage/' + code,
    );
  }
  getMainCategoriesLookup() {
    return this.ser.GetWithFullUrl(
      environment.apiUrl + '/Product/GetMainCategoryLookup',
    );
  }
}
