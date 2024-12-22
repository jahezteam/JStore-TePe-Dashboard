import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { convertToFormData } from '../../../pages/shared-module/Models/convertToFormData';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  constructor(private ser: ApiCallerService) {}
  post(model: any) {
    return this.ser.CreateWithFile(
      convertToFormData(model),
      '/Institution/CreateInstitution',
    );
  }
  getById(id: number) {
    return this.ser.GetById('Institution/GetInstitutionById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl('/Institution/GetInstitutions');
  }
  getPagination(model: any, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/Institution/GetAllPagging',
      isSearch,
    );
  }
  getPaginationFilter(isActive: boolean, model: any) {
    return this.ser.getFilterPagination(
      '/Institution/GetFilteredPaginated?PageNumber=' +
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
      '/Institution/SearchPagging',
      isSearch,
    );
  }
  update(model: any) {
    return this.ser.Update(model, '/Institution/UpdateInstitution');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/Institution/DeleteInstitution?Id=' + id,
    );
  }

  assignUserToInstitution(model: { userId: number[]; institutionId: number }) {
    return this.ser.Update(model, '/Institution/AssigneUsersToInstitution');
  }
  removeUserFromInstitution(model: {
    userId: number[];
    institutionId: number;
  }) {
    return this.ser.Update(model, '/Institution/RemoveUsersFromInstitution');
  }
}
