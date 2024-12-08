import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { role } from '../../Models/role';
import { rolePermissions } from '../../Models/rolePermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { permission } from '../../../permissions/Models/permission';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss'],

  providers: [ValidateService, DialogService, MessageService]
})
export class UpdateRoleComponent implements OnInit, OnDestroy {
  rolepermissions = rolePermissions;
  valid = false;
  allPermissions: allPermissions = new allPermissions();
  form: role = {
    id: 0,
    roleName: '',
    permissions: []

  };
  permissions: any;
  selectedPermission: permission = {} as permission;
  selectedPermissions: dropdown[] = [] as dropdown[];
  constructor(private validationService: ValidateService, private primengConfig: PrimeNGConfig,
    public dialogService: DialogService, public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, private messageService: MessageService,
    private pickList: PickListService, private auth: AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }

  }
  ngOnInit(): void {
    this.pickList.getPermissions().subscribe(res => {
      this.permissions = res;
      this.allPermissions.fillPermissions();

    });
    this.registerForm();
    this.primengConfig.ripple = true;
  }
  onseletedChanged(item: string, value: any) {
    if (value.checked) {
      if (this.form.permissions.indexOf(this.permissions.find((x: dropdown) => x.name == item)) == -1)
        this.form.permissions.push(this.permissions.find((x: dropdown) => x.name == item));
      else {
        this.messageService.add({ key: 'tl', severity: 'warn', summary: 'warn', detail: 'This group added before' });
      }
    }
    else {
      this.deleteItem(item);
    }
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  isChecked(item: string) {
    let per = this.form.permissions.find((x: permission) => x.name == item) as permission;
    let index = this.form.permissions.indexOf(per)
    return index != -1;
  }
  deleteItem(item: string) {
    let per = this.form.permissions.find((x: permission) => x.name == item) as permission;

    let index = this.form.permissions.indexOf(per);
    if (index != -1)
      this.form.permissions.splice(index, 1);
  }
  registerForm() {
    // console.log(this.config)
    this.form = {
      id: this.config.data?.id,
      roleName: this.config.data?.roleName,
      permissions: this.config.data?.permissions

    };
    this.validationService.registerForm(["roleName"]);

    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status)
    );
  }
  private validInput() {
    Object.keys(this.form).forEach((i) => {
      this.isInputValid(i, true);
    });
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }

  getValidation() {
    return !this.valid;
  }
  submit() {
    console.log(this.form)
    this.ref.close(this.form);
  }
  cancel() {
    this.ref.close(null);
  }


}

