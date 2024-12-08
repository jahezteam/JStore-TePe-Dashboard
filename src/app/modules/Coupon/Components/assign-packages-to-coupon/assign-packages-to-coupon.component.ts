import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { couponPermissions } from '../../Models/couponPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-assign-packages-to-coupon',
  templateUrl: './assign-packages-to-coupon.component.html',
  styleUrls: ['./assign-packages-to-coupon.component.scss'],
  providers: [ValidateService, DialogService, MessageService]

})
export class AssignPackagesToCouponComponent  implements OnInit, OnDestroy {
  valid = false;
  Packages: dropdown[] = [] as dropdown[];
  selectedPackages: dropdown[] = [] as dropdown[];
  // selectedPackages:dropdown[]=[] as dropdown[];
  // newPackages:dropdown[]=[] as dropdown[];
  couponPermissions = couponPermissions;

  constructor(private validationService: ValidateService, private primengConfig: PrimeNGConfig,
    public dialogService: DialogService, public ref: DynamicDialogRef, private messageService: MessageService,
    private pickList: PickListService,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }

  }
  data: any;
  ngOnInit(): void {
    this.data = this.config.data;
    if (this.data.type == "Remove") {
      this.pickList.getPackageLookupsForCoupons(this.data.pid, 2).subscribe(res => {
        this.Packages = res;
        this.primengConfig.ripple = true;
      });
    }
    else {
      this.pickList.getPackageLookupsForCoupons(this.data.pid, 1).subscribe(res2 => {
        this.Packages = res2;
        this.primengConfig.ripple = true;
      });
    }


  }
  deleteItem(item: dropdown) {
    let index = this.selectedPackages.indexOf(item);
    if (index != -1)
      this.selectedPackages = this.selectedPackages.slice(0, index).concat(this.selectedPackages.slice(index + 1));
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  submit() {
    if (this.selectedPackages == null || this.selectedPackages.length == 0)
      this.messageService.add({ key: 'tl', severity: 'warn', summary: 'warn', detail: 'You must select Product' });

    else {
      this.ref.close(this.selectedPackages);
    }
  }
  cancel() {
    this.ref.close(null);
  }


}

