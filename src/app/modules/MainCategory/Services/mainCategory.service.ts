import { Injectable } from '@angular/core';
import { mainCategory } from '../Models/mainCategory';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';

@Injectable({
  providedIn: 'root',
})
export class MainCategorysService {
  constructor(private ser: ApiCallerService) {}
  post(model: mainCategory) {
    const formData = new FormData();
    formData.append('NameAr', model.nameAr);
    formData.append('NameEn', model.nameEn);
    formData.append('DescriptionAr', model.descriptionAr);
    formData.append('DescriptionEn', model.descriptionEn);
    formData.append('Icon', model.icon);
    formData.append('Image', model.image);

    return this.ser.CreateWithFile(
      formData,
      '/MainCategory/CreateMainCategory',
    );
  }
  getById(id: number) {
    return this.ser.GetById('MainCategory/GetMainCategoryById', id);
  }
  getList() {
    return this.ser.GetWithFullUrl(
      environment.apiUrl + '/MainCategory/GetMainCategorys',
    );
  }
  getPagination(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/MainCategory/GetAllPagging',
      isSearch,
    );
  }
  getPaginationFilter(isActive: boolean, model: paginator) {
    return this.ser.getFilterPagination(
      '/MainCategory/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(
      model,
      '/MainCategory/SearchPagging',
      isSearch,
    );
  }
  update(model: mainCategory) {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    formData.append('NameAr', model.nameAr);
    formData.append('NameEn', model.nameEn);
    formData.append('DescriptionAr', model.descriptionAr);
    formData.append('DescriptionEn', model.descriptionEn);
    formData.append('Icon', model.icon);
    formData.append('Image', model.image);

    return this.ser.UpdateFormData(formData,'/MainCategory/UpdateMainCategory');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/MainCategory/DeleteMainCategory?Id=' + id,
    );
  }
}
