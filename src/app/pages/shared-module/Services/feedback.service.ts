import { Injectable } from '@angular/core';
import { ApiCallerService } from './api-caller.service';
import { feedback } from '../Models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private ser: ApiCallerService) {
  }
  post(model: feedback) {
    return this.ser.Create(model, "/Feedback/CreateFeedback");
  }

  postFormData(model: FormData) {
    return this.ser.CreateWithFile(model, "/Feedback/CreateFeedback");
  }
}
