import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(private ser: ApiCallerService) {}

  post(model: any) {
    return this.ser.Create(model, '/Feature/CreateFeature');
  }
  getById(id: number) {
    return this.ser.GetById('Feature/GetFeatureById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/Feature/GetFeatures');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Feature/GetAllPagging', isSearch).pipe(

    )
  }
  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/Feature/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Feature/SearchPagging', isSearch);
  }
  update(model: any) {
    return this.ser.Update(model, '/Feature/UpdateFeature');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/Feature/DeleteFeature?Id=' + id);
  }
}
