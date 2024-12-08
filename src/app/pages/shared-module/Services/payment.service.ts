import { Injectable } from '@angular/core';
import { ApiCallerService } from './api-caller.service';
import { paymentCard } from '../Models/payment-card';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  [x: string]: any;

  constructor(private http: HttpClient, private caller: ApiCallerService) {

  }
  apiUrl: string = environment.apiPaymentUrl;

  AddCustomer(data: paymentCard) {
    let url = this.apiUrl + "/customer/add";
    return this.http.post(url, data, { headers: new HttpHeaders({}) });
    // .pipe(
    //   map((result: any) => this.onSucess(result, 'create')),
    // );
  }
  subscribe(data: paymentCard) {
    return this.caller.Create(data, "/Payment/Subscribe");

  }
  // AddCustomer(data: paymentCard) {
  //   let url = this.apiUrl + "/customer/add";
  //   return this.http.post(url, data);
  // }

}

