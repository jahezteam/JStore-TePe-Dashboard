import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { Region } from '../Models/region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private ser: ApiCallerService) {}

  post(model: Region) {
    return this.ser.Create(model, '/Region/CreateRegion');
  }
  getById(id: number) {
    return this.ser.GetById('Region/GetRegionById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/Region/GetRegions');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Region/GetAllPagging', isSearch);
  }
  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/Region/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Region/SearchPagging', isSearch);
  }
  update(model: Region) {
    return this.ser.Update(model, '/Region/UpdateRegion');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/Region/DeleteRegion?Id=' + id);
  }
}
