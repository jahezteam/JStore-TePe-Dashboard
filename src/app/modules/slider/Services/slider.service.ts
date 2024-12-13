import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { paginator } from '../../../pages/shared-module/Models/Paginator';
import { convertToFormData } from '../../../pages/shared-module/Models/convertToFormData';
import { Slider } from '../Models/slider';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  constructor(private ser: ApiCallerService) {}
  post(model: Slider) {
    const formData = convertToFormData(model);
    return this.ser.CreateWithFile(formData, '/Slider/CreateSlider');
  }
  getById(id: number) {
    return this.ser.GetById('Slider/GetSliderById?Id=' + id, id);
  }
  getList() {
    return this.ser.GetWithFullUrl(environment.apiUrl + '/Slider/GetSliders');
  }
  getPagination(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Slider/GetAllPagging', isSearch);
  }
  getPaginationFilter(isActive: boolean, model: paginator) {
    return this.ser.getFilterPagination(
      '/Slider/GetFilteredPaginated?PageNumber=' +
        model.pageNumber +
        '&PageSize=' +
        model.pageSize +
        '&IsActive=' +
        isActive,
    );
  }
  search(model: paginator, isSearch: boolean = false) {
    return this.ser.getPagination(model, '/Slider/SearchPagging', isSearch);
  }
  update(model: Slider) {
    const formData = convertToFormData(model);

    return this.ser.UpdateFormData(formData, '/Slider/UpdateSlider');
  }
  delete(id: number) {
    return this.ser.DeleteWithQueryParam(id, '/Slider/DeleteSlider?Id=' + id);
  }
}
