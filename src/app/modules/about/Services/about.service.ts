import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { convertToFormData } from '../../../pages/shared-module/Models/convertToFormData';
import { About } from '../Models/about';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private ser: ApiCallerService) {}

  post(model: About) {
    const formData = convertToFormData(model);
    return this.ser.CreateWithFile(formData, '/AboutUs/CreateAboutUs');
  }
  getById(id: number) {
    return this.ser.GetById('/AboutUs/GetAboutUsById?Id=' + id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/AboutUs/GetAboutUs');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/AboutUs/GetAllPagging', isSearch);
  }
  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/AboutUs/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/AboutUs/SearchPagging', isSearch);
  }
  update(model: About) {
    const formData = convertToFormData(model);
    return this.ser.UpdateFormData(formData, '/AboutUs/UpdateAboutUs');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/AboutUs/DeleteAboutUs?Id=' + id);
  }

  postFeature(model: any) {
    return this.ser.Create(model, '/AboutUsFeature/CreateAboutUsFeature');
  }
  getFeatureById(id: number) {
    return this.ser.GetById('/AboutUsFeature/GetAboutUsFeatureById?Id=' + id);
  }
  getFeatureList() {
    return this.ser.GetWithFullUrl('/AboutUsFeature/GetAboutUsFeature');
  }
  getFeaturePagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/AboutUsFeature/GetAllPagging',
      isSearch,
    );
  }
  getFeaturePaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/AboutUsFeature/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  searchFeature(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/AboutUsFeature/SearchPagging',
      isSearch,
    );
  }
  updateFeature(model: any) {
    return this.ser.Update(model, '/AboutUsFeature/UpdateAboutUsFeature');
  }
  deleteFeature(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/AboutUsFeature/DeleteAboutUsFeature?Id=' + id,
    );
  }
}
