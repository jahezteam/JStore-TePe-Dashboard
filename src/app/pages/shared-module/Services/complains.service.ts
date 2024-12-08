import { Injectable } from '@angular/core';
import { ApiCallerService } from './api-caller.service';
import { support } from '../Models/support';

@Injectable({
  providedIn: 'root'
})
export class ComplainsService {
  constructor(private ser: ApiCallerService) {
  }
  post(model: support) {
    return this.ser.Create(model, "/Complains/CreateComplains");
  }

  postFormData(model: FormData) {
    return this.ser.CreateWithFile(model, "/Complains/CreateComplains");
  }

}
