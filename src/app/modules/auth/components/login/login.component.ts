import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../../../../environments/environment';
// import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService, DialogService],

})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: '',
    password: '',
  };
  loginForm!: FormGroup;
  hasError!: boolean;
  hasErrorSignIn:boolean=false;
  returnUrl!: string;
  isLoading$!: Observable<boolean>;
  //videoURL = environment.videoUrl;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,

    private changeDetection: ChangeDetectorRef
    // private permissionService: NgxPermissionsService,
  ) {
    //  this.isLoading$ = this.authService.is;
    // // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    //this.videoURL = environment.videoUrl;
    this.changeDetection.detectChanges();
    // // get return url from route parameters or default to '/'
    // this.returnUrl =
    //   this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }
  routeToPackages() {
    this.router.navigateByUrl("packeges");
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
  logout(){
    // this.authService.logoutothersesstions(this.f.email.value);
    // this.hasErrorSignIn = false;
    // this.changeDetection.detectChanges();
    this.router.navigateByUrl("/auth/signout-others");


  }
  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe((Response) => {
        if(Response.isLoggedIn)
        {
          this.hasErrorSignIn = true;
          this.changeDetection.detectChanges();
        }
        else{
          if (Response.isAuthenticated) {
            this.hasError = false;
            this.authService.setToken(Response["token"]);
            this.authService.loadUserData().then(x => {

              this.router.navigateByUrl("/dashboard");

            });
          }
          else {
            this.hasError = true;
            this.changeDetection.detectChanges();

          }
          this.hasErrorSignIn=false;
          this.changeDetection.detectChanges();

        }


      },
        (error) => {
          this.hasError = true;
          this.changeDetection.detectChanges();

        }
      );
    this.changeDetection.detectChanges();
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
