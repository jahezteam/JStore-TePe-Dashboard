import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class Helper {
  constructor() {}

  onSucess<T>(res: any, functionName: string) {
    return res;
  }
  onError(error: HttpErrorResponse, functionName: string) {
    return throwError(error);
  }
  onComplete(functionName: string) {}
}
