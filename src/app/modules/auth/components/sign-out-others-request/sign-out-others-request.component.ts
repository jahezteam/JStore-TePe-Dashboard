import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../../../../environments/environment';


enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-sign-out-others-request',
  templateUrl: './sign-out-others-request.component.html',
  styleUrls: ['./sign-out-others-request.component.scss'],
  providers: [DialogService,]

})
export class SignOutOthersRequestComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  //videoURL = environment.videoUrl;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, private authService: AuthenticationService,
    private auth: AuthenticationService,
    private changeDetection: ChangeDetectorRef,
    public dialogService: DialogService,

  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    //this.videoURL = environment.videoUrl;
    this.changeDetection.detectChanges();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      otp: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }
  sendOTP() {
    this.auth.sendOtp({ email: this.f['otp'].value }).subscribe((res: any) => {
      if (res.succeeded) {
        this.errorState = ErrorStates.NoError;

      }
      else {
        this.errorState = ErrorStates.HasError;

      }
    })
  }
  sendEmail: boolean = false;
  submit() {
    this.errorState = ErrorStates.NotSubmitted;
    //  const forgotPasswordSubscr = this.authService
    //   .forgotPassword(this.f.email.value)
    //   .pipe(first())
    //   .subscribe((result: boolean) => {
    //     this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
    //   });
    this.auth.LogoutOthersEmail({ email: this.f['email'].value, url: environment.returnedUrl }).subscribe((res: any) => {
      if (res.succeeded) {
        this.errorState = ErrorStates.NoError;
        this.sendEmail = true;
      }
      else {
        this.errorState = ErrorStates.HasError;
        this.sendEmail = false;


      }
    })
    // this.unsubscribe.push(forgotPasswordSubscr);
  }
}
