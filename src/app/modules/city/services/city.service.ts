import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private ser: ApiCallerService) {}

  post(model: any) {
    return this.ser.Create(model, '/City/CreateCity');
  }
  getById(id: number) {
    return this.ser.GetById('City/GetCityById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/City/GetCities');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/City/GetAllPagging', isSearch);
  }
  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/City/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/City/SearchPagging', isSearch);
  }
  update(model: any) {
    return this.ser.Update(model, '/City/UpdateCity');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/City/DeleteCity?Id=' + id);
  }
}
