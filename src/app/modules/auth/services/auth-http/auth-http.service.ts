import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';
import { user } from '../../../users/Models/user';
// import { NgxPermissionsService } from 'ngx-permissions';

const API_USERS_URL = `${environment.apiUrl}/Account`;

@Injectable({
  providedIn: 'root',
})
export class UserAuthHTTPService {
  constructor(private http: HttpClient,
    // private permissionsService: NgxPermissionsService
    ) {

    }
    private permissions: string[] = [];


  // public methods
  login(email: string, password: string): Observable<any> {

    return this.http.post<AuthModel>(`${API_USERS_URL}/login`, {
      email,
      password,
    } );
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  // CREATE =>  POST: add a new user to the server
  createUser(user: user): Observable<user> {
    return this.http.post<user>(`$API_USERS_URL/Register`, user);
  }
  public currentUser: BehaviorSubject<Object> = new BehaviorSubject<Object>(
    {}
  );
  loadUserData() {
    this.http
      .get(environment.apiUrl + "/User/logged", this.generateHeaders())
      .subscribe((Response) => {
        this.permissions = Response as []

        this.initNgxPermissions(Response as []);

        this.currentUser.next(Response);
      });
  }
  private generateHeaders() {
    const token = this.getToken();

    let _headers = {};
    if (this.isAuthenticated())
    {
      _headers={ "Content-Type": "application/json" ,
      "Authorization":"Bearer " + token};
    }
    else{
      _headers={ "Content-Type": "application/json"};
    }
    return {
      headers: new HttpHeaders(_headers),
      withCredentials: true,
    };
  }
  isAuthenticated(): boolean {
    const localstorage = this.getToken();

    return localstorage == null ? false : true;
  }

  isAuthorized(url: string): boolean {
    return this.isAuthenticated() && this.userHasPermission(url); // ToDo change logic to check url required permission
  }
  userHasPermission(name: string) {
    return (
      this.permissions.find(
        (x) => x.trim().toLowerCase() === name.trim().toLowerCase()
      ) !== null
    );
  }
  initNgxPermissions(permissions: string[]) {
    // this.permissionsService.loadPermissions(permissions);
  }
  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<user> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<user>(`${API_USERS_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
