import { Injectable } from '@angular/core';
import { category } from '../Models/category';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  constructor(private ser: ApiCallerService) {}
  post(model: category) {
  const formData = new FormData();
    formData.append('NameAr', model.nameAr);
    formData.append('NameEn', model.nameEn);
    formData.append('DescriptionAr', model.descriptionAr);
    formData.append('DescriptionEn', model.descriptionEn);
    formData.append('Icon', model.icon);
    formData.append('Image', model.image);
    formData.append('MainCategoryId', model.mainCategoryId);

    return this.ser.CreateWithFile(formData, '/Category/CreateCategory');
  }
  getById(id: number) {
    return this.ser.GetById('Category/GetCategoryById?Id=' + id, id);
  }
  getList() {
    return this.ser.GetWithFullUrl(
      environment.apiUrl + '/Category/GetCategorys',
    );
  }
  getPagination(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Category/GetAllPagging', isSearch);
  }
  getPaginationFilter(isActive: boolean, model: paginator) {
    return this.ser.getFilterPagination(
      '/Category/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Category/SearchPagging', isSearch);
  }
  update(model: category) {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    formData.append('NameAr', model.nameAr);
    formData.append('NameEn', model.nameEn);
    formData.append('DescriptionAr', model.descriptionAr);
    formData.append('DescriptionEn', model.descriptionEn);
    formData.append('Icon', model.icon);
    formData.append('Image', model.image);
    formData.append('MainCategoryId', model.mainCategoryId);

    return this.ser.UpdateFormData(formData, '/Category/UpdateCategory');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(
      id,
      '/Category/DeleteCategory?Id=' + id,
    );
  }
}
// export interface per{
//   id:number;
//   name:string;
// }
