import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { role } from '../../Models/role';
import { rolePermissions } from '../../Models/rolePermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
  providers: [ValidateService, DialogService, MessageService],
})
export class CreateRoleComponent implements OnInit, OnDestroy {
  valid = false;
  rolePermissions = rolePermissions;
  permissions: any;
  selectedPermission: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  allPermissions: allPermissions = new allPermissions();

  form: role = {
    id: 0,
    roleName: '',
    permissions: [],
  };
  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private pickList: PickListService,
    private auth: AuthenticationService,
  ) {}
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnInit(): void {
    this.pickList.getPermissions().subscribe((res) => {
      this.permissions = res;
      console.log(this.permissions);

      this.registerForm();
      this.allPermissions.fillPermissions();
      this.primengConfig.ripple = true;
    });
  }

  onseletedChanged(item: string, value: any) {
    if (value.checked) {
      if (
        this.selectedPermissions.indexOf(
          this.permissions.find((x: dropdown) => x.name == item),
        ) == -1
      )
        this.selectedPermissions.push(
          this.permissions.find((x: dropdown) => x.name == item),
        );
      else {
        this.messageService.add({
          key: 'tl',
          severity: 'warn',
          summary: 'warn',
          detail: 'This Permission added before',
        });
      }
    } else {
      this.deleteItem(item);
    }
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  deleteItem(item: string) {
    let index = this.selectedPermissions.indexOf(
      this.permissions.find((x: dropdown) => x.name == item),
    );
    if (index != -1) this.selectedPermissions.splice(index, 1);
  }
  registerForm() {
    this.form = {
      id: 0,
      roleName: '',
      permissions: [],
    };
    this.validationService.registerForm(['roleName']);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status),
    );
  }

  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }

  getValidation() {
    return !this.valid && this.form.permissions.length > 0;
  }
  submit() {
    if (this.selectedPermissions.length > 0) {
      this.selectedPermissions.forEach((x) => {
        this.form.permissions.push({ id: Number(x.id), name: x.name });
      });
    }
    this.ref.close(this.form);
  }
  cancel() {
    // console.log(this.allPermissions.role)
    this.ref.close(null);
  }
}
