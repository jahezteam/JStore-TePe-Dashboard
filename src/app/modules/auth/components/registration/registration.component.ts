import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { result } from '../../models/result';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { Ng2TelInput } from 'ng2-tel-input';
import { environment } from '../../../../../environments/environment';
import { countries } from '../../../../pages/shared-module/Models/countries-store';
import { user } from '../../../users/Models/user';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from "ngx-intl-telephone-input";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [DialogService,]

})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('phoneInput', { static: false })
  // phoneInput!: Ng2TelInput;

  phoneNumber: string = '';
  registrationForm!: FormGroup;
  hasError!: boolean;
  isLoading$!: Observable<boolean>;
  //videoURL = environment.videoUrl;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  public countries: any = countries;
  selectedCountry: any = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    // @Inject(NgbModal) private modalService: NgbModal,
    private router: Router,
    public dialogService: DialogService,

    private changeDetection: ChangeDetectorRef,

  ) {
    // this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }
pCountry:any;
sField:any;
nFormat:any;
  ngOnInit(): void {
    this.initForm();
    //this.videoURL = environment.videoUrl;
    // this.setCountry();
    this.pCountry=CountryISO.Egypt;
    this.sField=SearchCountryField.All;
    this.nFormat=PhoneNumberFormat.International;
    this.changeDetection.detectChanges();



  }
  setCountry(){
    // let c=Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const timezone = countriesAndTimezones.getTimezone(c);
  //  console.log(timezone)
    // let country = tzlookup(0, 0);

  }



  moberror = false;
  HasError(event: any) {
    this.moberror = !event;
  }
  getNumber(event: any) {
    if(event.phoneNumber.length>1)
    {
    this.phoneNumber ="+"+event.dialCode+event.phoneNumber;
    this.moberror=event.isNumberValid;
    this.f["phoneNumber"].patchValue(this.phoneNumber);
    console.log(this.f)
  }
  else{
    this.phoneNumber="";
    this.moberror=false;
    this.f["phoneNumber"].patchValue('');
  }
}
  telInputObject(event: any) {

  }
  onCountryChange(event: any) {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        nationality: [
          this.countries.find((x:any)=>x.name=='Egypt'),
          Validators.compose([
          ]),
        ],
        phoneNumber: [
          '',
          Validators.compose([
            Validators.required,
            // Validators.minLength(10),
            // Validators.maxLength(20),
          ]),
        ],
        userName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(200),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }
  newUser: user = {} as user;
  submit() {
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    result['phoneNumber'] = this.phoneNumber;
    this.setUser(result);
    const registrationSubscr = this.authService
      .createUser(this.newUser)
      .pipe(first())
      .subscribe((res: result) => {
        if (res.succeeded) {
          // this.router.navigate(['/auth']);
          const loginSubscr = this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe((Response) => {
        if(Response.isLoggedIn)
        {
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
        } else {
          this.hasError = true;
          this.errors = res.errors;
          this.changeDetection.detectChanges();
        }
      });
    this.unsubscribe.push(registrationSubscr);
  }
  errors!: string[];
  setUser(user: any) {
    this.newUser.id = user.id;
    this.newUser.firstName = user.firstName || '';
    this.newUser.lastName = user.lastName || '';
    this.newUser.idNumber = user.idNumber || '';

    this.newUser.userName = user.userName || '';
    this.newUser.password = user.password || '';
    this.newUser.confirmPassword = user.cPassword || '';

    this.newUser.phoneNumber = user.phoneNumber || '';
    this.newUser.email = user.email || '';
    this.newUser.job = user.job || '';
    this.newUser.nationality = user.nationality.name || '';

    this.newUser.isAdmin = false;


    this.newUser.birthDate = user.birthDate || null;


    this.newUser.roles = user.roles || [];
    this.newUser.permissions = user.permissions || [];


  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

