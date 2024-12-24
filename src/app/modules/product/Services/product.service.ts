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
  appendProductDataToFormData(formData: any, productData: product) {
    // Basic fields
    formData.append('TitleAr', productData.titleAr);
    formData.append('TitleEn', productData.titleEn);
    formData.append('LongDescriptionAr', productData.longDescriptionAr);
    formData.append('LongDescriptionEn', productData.longDescriptionEn);
    formData.append('ShortDescriptionAr', productData.shortDescriptionAr);
    formData.append('ShortDescriptionEn', productData.shortDescriptionEn);
    formData.append('ModelNumber', productData.modelNumber);
    formData.append('CategoryId', productData.categoryId);

    // Append Features and Images
    if (productData.features && Array.isArray(productData.features)) {
      productData.features.forEach((feature: any, index: any) => {
        formData.append(`Features[${index}].FeatureId`, feature.featureId);
        formData.append(`Features[${index}].UnitPriceAr`, feature.unitPriceAr);
        formData.append(`Features[${index}].UnitPriceEn`, feature.unitPriceEn);
        formData.append(`Features[${index}].Quantity`, feature.quantity);
        formData.append(`Features[${index}].Price`, feature.price);

        // Handle images for each feature
        if (feature.images && Array.isArray(feature.images)) {
          feature.images.forEach((image: any) => {
            // Ensure the image is a File object
            if (image instanceof File) {
              formData.append(`Features[${index}].Images`, image);
            }
          });
        }
      });
    }

    return formData;
  }

  post(model: product) {
    const formData = new FormData();
    const data = this.appendProductDataToFormData(formData, model);
    return this.ser.CreateWithFile(data, '/Product/CreateProduct');
    // return this.ser.CreateWithFile(data, '/Product/CreateProductFeature');
  }
  postFormData(model: FormData) {
    return this.ser.CreateWithFile(model, '/Product/CreateProduct');
  }
  getById(id: number) {
    return this.ser.GetById('/Product/GetProductById?Id=' + id, id);
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
    const formData = new FormData();
    const data = this.appendProductDataToFormData(formData, model);
    return this.ser.UpdateFormData(data, '/Product/UpdateProduct');
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
  addProductFeatureQuantity(model: any) {
    return this.ser.Update(model, '/Product/UpdateProductFeatureQuantaty');
  }
}
