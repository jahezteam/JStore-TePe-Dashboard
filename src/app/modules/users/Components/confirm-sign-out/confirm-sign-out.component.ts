import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { changeUserPassword, resetPassword } from '../../Models/changePassword';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
@Component({
  selector: 'app-confirm-sign-out',
  templateUrl: './confirm-sign-out.component.html',
  styleUrls: ['./confirm-sign-out.component.scss'],
  providers: [ValidateService, DialogService, MessageService]

})
export class ConfirmSignOutComponent implements OnInit, OnDestroy {
  valid = false;
  constructor(private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private messageService: MessageService,

    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    // if (this.ref) {
    //   this.ref.close();
    // }

  }
  token: any;
  email: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
      this.primengConfig.ripple = true;
    });


  }

  // registerForm() {
  //   this.validationService.registerForm(["newPassword", "confirmedPassword"]);
  //   this.validationService.validStatus.subscribe(
  //     (status) => (this.valid = status)
  //   );
  // }
  // passwordMatched: boolean = false;
  // isInputValid(name: string, status: boolean) {
  //   if (name == 'confirmedPassword') {
  //     if (this.form.password == this.form.confirmPassword) {
  //       this.passwordMatched = true;
  //       this.validationService.updateFormFlag(name, true);

  //     }
  //     else {
  //       this.passwordMatched = false;
  //       this.validationService.updateFormFlag(name, false);
  //     }
  //   }
  //   else
  //     this.validationService.updateFormFlag(name, status);
  // }
  submit() {
    // this.form.email = this.email;
    // this.form.token = this.token;

    this.auth.SignOutOtherSessions(this.email).subscribe(x => {
      if (x) {
        this.router.navigateByUrl("/auth/login");
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "General error" });
      }
    });
  }
  cancel() {
    this.router.navigateByUrl("/auth/login");
  }


}

