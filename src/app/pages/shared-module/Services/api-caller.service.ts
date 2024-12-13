import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Helper } from './helper';
import { catchError, finalize, map } from 'rxjs/operators';
import { paginator } from '../Models/Paginator';
import { environment } from '../../../../environments/environment';
import { paggingParam } from '../Models/pagging_param';

// import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class ApiCallerService extends Helper {
  public API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }
  Create(data: any, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.post(url, data, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'create')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'create')),
      finalize(() => {
        this.onComplete('create');
      }),
    );
  }
  CreateWithFile(data: FormData, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http
      .post(url, data, {
        headers: new HttpHeaders({ Accept: 'application/json' }),
      })
      .pipe(
        map((result: any) => this.onSucess(result, 'create')),
        catchError((error: HttpErrorResponse) => this.onError(error, 'create')),
        finalize(() => {
          this.onComplete('create');
        }),
      );
  }
  getPaginationData(body: paginator, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.post(url, body, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'getPaginationData')),
      catchError((error: HttpErrorResponse) =>
        this.onError(error, 'getPaginationData'),
      ),
      finalize(() => {
        this.onComplete('getPaginationData');
      }),
    );
  }
  getPagination(
    body: paginator,
    controllerName: string,
    issearch: boolean = false,
  ) {
    // debugger
    let url = this.API_URL + controllerName;
    if (issearch) {
      url +=
        body.searchText == '*'
          ? '?SearchValue=' + ''
          : '?SearchValue=' +
            body.searchText +
            '&PageNumber=' +
            body.pageNumber +
            '&PageSize=' +
            body.pageSize;
    } else {
      if (body.searchText == '' || body.searchText == '*')
        url += '?PageNumber=' + body.pageNumber + '&PageSize=' + body.pageSize;
      else
        url +=
          '?SearchValue=' +
          body.searchText +
          '&PageNumber=' +
          body.pageNumber +
          '&PageSize=' +
          body.pageSize;
    }
    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'getPagination')),
      catchError((error: HttpErrorResponse) =>
        this.onError(error, 'getPagination'),
      ),
      finalize(() => {
        this.onComplete('getPagination');
      }),
    );
  }
  getFilterPagination(controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'getPagination')),
      catchError((error: HttpErrorResponse) =>
        this.onError(error, 'getPagination'),
      ),
      finalize(() => {
        this.onComplete('getPagination');
      }),
    );
  }
  DeleteWithQueryParam(id: number, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.delete(url, { headers: new HttpHeaders({}) }).pipe(
      map((data: any) => this.onSucess(data, 'delete')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'delete')),
      finalize(() => {
        this.onComplete('delete');
      }),
    );
  }
  UpdateWithQueryParam(id: number, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.put(url, { headers: new HttpHeaders({}) }).pipe(
      map((data: any) => this.onSucess(data, 'delete')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'delete')),
      finalize(() => {
        this.onComplete('delete');
      }),
    );
  }
  Delete(id: number, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.delete(url + '/' + id, this.generaterHeaders()).pipe(
      map((data: any) => this.onSucess(data, 'delete')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'delete')),
      finalize(() => {
        this.onComplete('delete');
      }),
    );
  }
  DeleteWithFullUrl(controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.delete(url, { headers: new HttpHeaders({}) }).pipe(
      map((data: any) => this.onSucess(data, 'delete')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'delete')),
      finalize(() => {
        this.onComplete('delete');
      }),
    );
  }

  Update(data: any, controllerName: string) {
    let url = this.API_URL + controllerName;

    return this.http.put(url, data, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'update')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'update')),
      finalize(() => {
        this.onComplete('update');
      }),
    );
  }
  UpdateFormData(data: FormData, controllerName: string) {
    let url = this.API_URL + controllerName;

    return this.http
      .put(url, data, {
        headers: new HttpHeaders({ Accept: 'application/json' }),
      })
      .pipe(
        map((result: any) => this.onSucess(result, 'update')),
        catchError((error: HttpErrorResponse) => this.onError(error, 'update')),
        finalize(() => {
          this.onComplete('update');
        }),
      );
  }
  UpdateById(id: number, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.put(url, null, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'update')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'update')),
      finalize(() => {
        this.onComplete('update');
      }),
    );
  }
  GetById(controllerName: string, id?: any) {
    let url = this.API_URL + controllerName;
    // if (id) {
    //   url += "/" + id;
    // }
    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((data: any) => this.onSucess(data, 'get')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'get')),
      finalize(() => {
        this.onComplete('get');
      }),
    );
  }
  GetByIdQuesry(controllerName: string, id?: any) {
    let url = this.API_URL + controllerName;

    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((data: any) => this.onSucess(data, 'get')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'get')),
      finalize(() => {
        this.onComplete('get');
      }),
    );
  }
  GetWithFullUrl(url: string) {
    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((data: any) => this.onSucess(data, 'get')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'get')),
      finalize(() => {
        this.onComplete('get');
      }),
    );
  }
  GetImagesWithFullUrl(url: string) {
    return this.http.get(url, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      responseType: 'blob' as 'json',
    });
    //.pipe(
    //map((data: any) => this.onSuccess(data, 'get')),
    // catchError((error: HttpErrorResponse) => this.onError(error, 'get')),
    //finalize(() => {
    //this.onComplete('get');
    // }),
    //);
  }
  CreateWithImageRepnse(controllerName: string, data: any) {
    let url = this.API_URL + controllerName;
    return this.http.post(url, data, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      responseType: 'blob' as 'json',
    });
    //.pipe(
    //map((data: any) => this.onSucess(data, 'get')),
    // catchError((error: HttpErrorResponse) => this.onError(error, 'get')),
    //finalize(() => {
    //this.onComplete('get');
    // }),
    //);
  }
  GetList(controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((data: any) => this.onSucess(data, 'get')),
      catchError((error: HttpErrorResponse) => this.onError(error, 'get')),
      finalize(() => {
        this.onComplete('get');
      }),
    );
  }
  public generaterHeaders() {
    // debugger
    // const _headers = { "Content-Type": "application/json","Authorization":"" };
    const token = localStorage.getItem('token');
    // if (this.isAuthenticated()) _headers["Authorization"] = "Bearer " + token;
    // let x= {
    //   headers: new HttpHeaders(_headers),
    //   withCredentials: true,
    // };
    // return x
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    if (this.isAuthenticated())
      headers_object.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: headers_object,
    };
    return httpOptions;
  }
  isAuthenticated(): boolean {
    const localstorage = localStorage.getItem('token');

    return localstorage == null ? false : true;
  }

  getDataPagged(body: paggingParam, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'getDataPagged')),

      catchError((error: HttpErrorResponse) =>
        this.onError(error, 'getDataPagged'),
      ),
      finalize(() => {
        this.onComplete('getDataPagged');
      }),
    );
  }

  getResponseHeader(controllerName: any) {
    let url = this.API_URL + controllerName;
    return this.http
      .get<any>(url, { observe: 'response' })
      .subscribe((resp) => {
        // console.log(resp.headers.get('X-Token'));
      });
  }

  Search(body: paggingParam, searchKey: string, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.get(url, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'Search')),

      catchError((error: HttpErrorResponse) => this.onError(error, 'Search')),
      finalize(() => {
        this.onComplete('Search');
      }),
    );
  }

  UploadFiles(data: any, controllerName: string) {
    let url = this.API_URL + controllerName;
    return this.http.post(url, data, { headers: new HttpHeaders({}) }).pipe(
      map((result: any) => this.onSucess(result, 'UploadFiles')),
      catchError((error: HttpErrorResponse) =>
        this.onError(error, 'UploadFiles'),
      ),
      finalize(() => {
        this.onComplete('UploadFiles');
      }),
    );
  }
}
