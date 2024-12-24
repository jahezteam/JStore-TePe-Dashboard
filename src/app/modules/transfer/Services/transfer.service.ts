import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { paginator } from '../../../pages/shared-module/Models/Paginator';
import { FilterType } from '../Models/transfer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(
    private ser: ApiCallerService,
    private http: HttpClient,
  ) {}
  transferProduct(model: any) {
    return this.ser.Create(
      model,
      '/ProductFeatureTransfer/AssignProductToInstitutions',
    );
  }
  getById(id: number) {
    return this.ser.GetById(
      '/ProductFeatureTransfer/GetProductFeatureById?Id=' + id,
      id,
    );
  }
  getPagination(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/ProductFeatureTransfer/GetAllPagging',
      isSearch,
    );
  }
  getPaginationFilter(filterData: FilterType, model: any) {
    return this.http.get(
      environment.apiUrl +
        '/ProductFeatureTransfer/GetFilteredPaginated?paggingParam.PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize,
      {
        params: { ...filterData },
      },
    );

    // return this.ser.getFilterPagination(
    //   '/ProductFeatureTransfer/GetFilteredPaginated?paggingParam.PageNumber=' +
    //     model.pageNumber +
    //     '&PageSize=' +
    //     model.pageSize +
    //     '&IsActive=' +
    //     isActive,
    // );
  }
  search(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/ProductFeatureTransfer/SearchPagging',
      isSearch,
    );
  }
}
