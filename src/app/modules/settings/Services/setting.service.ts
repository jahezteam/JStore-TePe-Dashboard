import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../pages/shared-module/Services/api-caller.service';
import { environment } from '../../../../environments/environment';
import { convertToFormData } from '../../../pages/shared-module/Models/convertToFormData';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private ser: ApiCallerService) {}

  post(model: any) {
    console.log('Create', model);

    return this.ser.CreateWithFile(
      convertToFormData(model),
      '/Setting/CreatreSetting',
    );
  }
  update(model: any) {
    return this.ser.UpdateFormData(
      convertToFormData(model),
      '/Setting/UpdateSetting',
    );
  }

  getList() {
    return this.ser.GetWithFullUrl(environment.apiUrl + '/Setting/GetSetting');
  }
}
