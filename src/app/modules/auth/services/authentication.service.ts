import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthModel } from '../models/auth.model';
import { Router } from '@angular/router';
import { result } from '../models/result';
import {
  changePassword,
  resetPassword,
} from '../../users/Models/changePassword';
import { role } from '../../roles/Models/role';
import { environment } from '../../../../environments/environment';
import { user } from '../../users/Models/user';

const API_USERS_URL = `${environment.apiUrl}/Account`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private permissionsService: NgxPermissionsService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<user>({} as user);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
  private permissions: string[] = [];
  private roles: string[] = [];

  currentUser$: Observable<user>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<user>;
  isLoadingSubject: BehaviorSubject<boolean>;
  get currentUserValue(): user {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: user) {
    this.currentUserSubject.next(user);
  }

  // public methods
  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post<AuthModel>(`${API_USERS_URL}/login`, {
      userName: email,
      password: password,
    });
  }
  changePassword(model: changePassword): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post<any>(`${API_USERS_URL}/ChangePassword`, model, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
  resetPassword(model: resetPassword): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post<any>(`${API_USERS_URL}/ResetPassword`, model, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  // CREATE =>  POST: add a new user to the server
  createUser(user: user): Observable<result> {
    return this.http.post<result>(`${API_USERS_URL}/Register`, user);
  }
  public currentUser: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  logout() {
    /*
    this.SignOut().subscribe(res=>{
      if(res)
      {
        this.permissionsService.flushPermissions();
        // this.cookieService.deleteAll();
        localStorage.clear();
        this.router.navigate(["/auth"]);
      }
    });*/
    this.permissionsService.flushPermissions();
    // this.cookieService.deleteAll();
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
  logoutothersesstions(email: any) {
    this.SignOutOtherSessions(email).subscribe((res) => {
      if (res) {
        this.permissionsService.flushPermissions();
        // this.cookieService.deleteAll();
        localStorage.clear();
        // this.router.navigate(["/home"]);
      }
    });
  }
  logoutUser(UserId = 0) {
    return this.SignOutUser(UserId);
  }
  loadUserData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(environment.apiUrl + '/User/CurrentUser', {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }),
        })
        .subscribe(
          (Response) => {
            if (Response != null && Response != undefined) {
              localStorage.setItem('userData', JSON.stringify(Response));
              let user = Response as any;
              this.roles = [];
              this.permissions = [];
              user.roles.forEach((role: role) => {
                this.roles.push(role.roleName);
                role.permissions.forEach((per) => {
                  this.permissions.push(per.name);
                });
              });
              this.currentUserSubject.next(Response as user);
              this.initNgxPermissions(this.permissions);

              this.currentUser.next(Response);
              resolve(1);
            } else {
              reject(0);

              this.router.navigateByUrl('/auth');
            }
          },
          (error) => {
            reject(0);

            this.router.navigateByUrl('/auth');
          },
        );
    });
  }
  ForgetPassword(model: any) {
    return this.http.post(
      environment.apiUrl + '/Account/ForgetPassword',
      model,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      },
    );
  }
  LogoutOthersEmail(model: any) {
    return this.http.post(
      environment.apiUrl + '/Account/SignOutFromSessionsEmail',
      model,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      },
    );
  }
  sendOtp(model: any) {
    return this.http.post(environment.apiUrl + '/Account/SendOtp', model, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
  public generateHeaders() {
    const token = localStorage.getItem('token');
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: headers_object,
    };
    return httpOptions;
  }
  addKey(key: string, value: any) {
    let p = localStorage.getItem(key);
    if (p != null) {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  getKey(key: string) {
    let p = localStorage.getItem(key);
    if (p != null) {
      return JSON.parse(p);
    }
    return null;
  }
  removeKey(key: string) {
    localStorage.removeItem(key);
  }
  addPackageToLocalStorage(Id: number) {
    let packages: number[] = [] as number[];
    let p = localStorage.getItem('Packages');
    if (p != null) {
      packages = JSON.parse(p);
      packages.push(Id);
      localStorage.removeItem('Packages');
      localStorage.setItem('Packages', JSON.stringify(packages));
    } else {
      packages.push(Id);
      localStorage.setItem('Packages', JSON.stringify(packages));
    }
  }
  getPackageFromLocalStorage() {
    let packages: number[] = [] as number[];
    let p = localStorage.getItem('Packages');
    if (p != null) {
      packages = JSON.parse(p);
      return packages;
    }
    return null;
  }
  RemovePackageTFromLocalStorage(Id: number) {
    let packages: number[] = [] as number[];
    let p = localStorage.getItem('Packages');
    if (p != null) {
      packages = JSON.parse(p);
      if (packages.find((x) => x == Id)) {
        packages.splice(packages.indexOf(Id), 1);
        localStorage.removeItem('Packages');
        localStorage.setItem('Packages', JSON.stringify(packages));
      }
    }
  }
  checkPackageExistInLocalStorage(Id: number) {
    let packages: number[] = [] as number[];
    let p = localStorage.getItem('Packages');
    if (p != null) {
      packages = JSON.parse(p);
      if (packages.find((x) => x == Id)) return true;
      else return false;
    }
    return false;
  }
  isAuthenticated(): boolean {
    const localstorage = this.getToken();
    return localstorage == null || localstorage == '' ? false : true;
  }

  isAuthorized(url: string): boolean {
    // if (url == 'NotAdmin') {
    //   var user = localStorage.getItem("userData");
    //   if (user != null) {
    //     let obj = JSON.parse(user);
    //     return this.isAuthenticated() && !obj.isAdmin;
    //
    //   }
    //   else {
    //     return this.isAuthenticated();
    //   }
    // }
    // else {
    //   return this.isAuthenticated() && this.userHasPermission(url); // ToDo change logic to check url required permission
    // }
    return true;
  }
  public getCurrentUserId(): number {
    var user = localStorage.getItem('userData');
    if (user != null) {
      let obj = JSON.parse(user);
      return obj?.id;
    } else {
      return 0;
    }
  }
  isInRole(role: string) {
    let x = this.roles.find(
      (x) => x.trim().toLowerCase() === role.trim().toLowerCase(),
    );
    return x !== null && x !== undefined;
  }
  userHasPermission(name: string) {
    let x = this.permissions?.find(
      (x) => x.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    return x !== null && x !== undefined;
  }
  initNgxPermissions(permissions: string[]) {
    this.permissionsService.loadPermissions(permissions);
  }
  hasPermission(per: string): boolean {
    this.permissionsService.permissions$.subscribe((permissions) => {
      // console.log(permissions[per].name==per)
      if (permissions[per]?.name == per) {
        return false;
      } else {
        return true;
      }
    });
    return false;
  }
  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }
  SignOut(): Observable<boolean> {
    let userId = this.getCurrentUserId();
    return this.http.post<boolean>(`${API_USERS_URL}/SignOut`, {
      userId: userId,
    });
  }
  SignOutOtherSessions(email: any): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/SignOutOtherSesstions`, {
      email: email,
    });
  }
  SignOutUser(userId: any = 0): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/SignOut`, {
      userId: userId,
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

export interface userType {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  userName: string;
  email: string;
  password: String;
  phoneNumber: string;
  birthDate: Date;
  job: string;
  confirmPassword: string;
  roles: string[];
  permissions: string[];
}
