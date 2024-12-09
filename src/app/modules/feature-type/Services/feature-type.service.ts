import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { FeatureType } from '../Modals/feature-type';

@Injectable({
  providedIn: 'root',
})
export class FeatureTypeService {
  constructor(private ser: ApiCallerService) {}

  post(model: FeatureType) {
    return this.ser.Create(model, '/FeatureType/CreateFeaturType');
  }
  getById(id: number) {
    return this.ser.GetById('FeatureType/GetFeaturTypeById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/FeatureType/GetFeaturTypes');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/FeatureType/GetAllPagging',
      isSearch,
    );
  }
  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/FeatureType/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/FeatureType/SearchPagging',
      isSearch,
    );
  }
  update(model: FeatureType) {
    return this.ser.Update(model, '/FeatureType/UpdateFeaturType');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/FeatureType/DeleteFeaturType?Id=' + id,
    );
  }
}
