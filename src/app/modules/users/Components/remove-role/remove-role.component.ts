import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { userPermissions } from '../../Models/userPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { role } from '../../../roles/Models/role';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-remove-role',
  templateUrl: './remove-role.component.html',
  styleUrls: ['./remove-role.component.scss'],
  providers: [ValidateService, DialogService, MessageService],
})
export class RemoveRoleComponent implements OnInit, OnDestroy {
  valid = false;
  selectedRole: dropdown = {} as dropdown;
  selectedRoles: dropdown[] = [] as dropdown[];
  roles: dropdown[] = [] as dropdown[];
  userPermissions = userPermissions;

  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private pickList: PickListService,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
  ) {}
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnInit(): void {
    this.registerForm();
  }

  onseletedChanged() {
    if (this.selectedRoles.indexOf(this.selectedRole) == -1)
      this.selectedRoles.push(this.selectedRole);
    else {
      this.messageService.add({
        key: 'tl',
        severity: 'warn',
        summary: 'warn',
        detail: 'This Role added before',
      });
    }
  }
  deleteItem(item: dropdown) {
    if (item.name == this.selectedRole.name) {
      this.selectedRole = { name: '', id: '' };
    }
    let index = this.selectedRoles.indexOf(item);
    if (index != -1) this.selectedRoles.splice(index, 1);
  }
  registerForm() {
    if (this.config.data != null && this.config.data.length > 0) {
      this.config.data.forEach((item: role) => {
        this.roles.push({ id: item.id.toString(), name: item.roleName });
      });
    }
  }
  getValidation() {
    return this.selectedRoles.length == 0;
  }
  submit() {
    if (this.selectedRoles.length > 0) this.ref.close(this.selectedRoles);
    else {
      this.messageService.add({
        key: 'tl',
        severity: 'warn',
        summary: 'warn',
        detail: 'You must select at least one role',
      });
    }
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  cancel() {
    this.ref.close(null);
  }
}
