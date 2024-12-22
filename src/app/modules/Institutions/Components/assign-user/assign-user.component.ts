import { Component } from '@angular/core';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { InstitutionPermissions } from '../../Models';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { user } from '../../../users/Models/user';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-assign-user',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './assign-user.component.html',
  styleUrl: './assign-user.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class AssignUserComponent {
  data: any = {
    usersIds: [],
    institutionId: this.config.data.id,
  };
  valid = false;
  users: dropdown[] = [] as dropdown[];
  selectedUser: dropdown = {} as dropdown;
  selectedUsers: dropdown[] = [] as dropdown[];
  newUser: dropdown[] = [] as dropdown[];
  institutionPermissions = InstitutionPermissions;

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
    this.pickList.getUserLookups().subscribe((res) => {
      this.users = res;
      this.registerForm();
      this.primengConfig.ripple = true;
    });
  }
  onSelectedChanged() {
    let added = false;
    this.selectedUsers.forEach((x) => {
      if (x.id.toString() == this.selectedUser.id.toString()) {
        added = true;
        this.messageService.add({
          key: 'tl',
          severity: 'warn',
          summary: 'warn',
          detail: 'This Role added before',
        });
        return;
      }
    });
    const index = this.newUser.indexOf(this.selectedUser);
    if (index !== -1) {
      added = true;
      this.messageService.add({
        key: 'tl',
        severity: 'warn',
        summary: 'warn',
        detail: 'This Role added before',
      });
      return;
    }
    // if(this.selectedRoles.indexOf(this.selectedRole)==-1 || (this.newRoles.indexOf(this.selectedRole as dropdown) )==-1)
    // {
    if (!added) this.newUser.push(this.selectedUser);
    // }

    // else{
    //   this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Role added before'});
    // }
  }
  deleteItem(item: dropdown) {
    if (item.name == this.selectedUser.name) {
      this.selectedUser = { name: '', id: '' };
    }
    let index = this.newUser.indexOf(item);
    if (index != -1) {
      this.newUser.splice(index, 1);
    }
  }
  registerForm() {
    if (this.config.data.users != null && this.config.data.users.length > 0) {
      this.config.data.users.forEach((item: user) => {
        this.selectedUsers.push({
          id: item.id.toString(),
          name: item.userName.toString(),
        } as dropdown);
      });
    }
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  getValidation() {
    return this.newUser.length == 0;
  }
  submit() {
    this.newUser.forEach((x) => {
      this.data.usersIds.push(x.id);
    });
    if (this.newUser.length > 0) this.ref.close(this.data);
    else {
      this.messageService.add({
        key: 'tl',
        severity: 'warn',
        summary: 'warn',
        detail: 'You must select at least one User',
      });
    }
  }
  cancel() {
    this.ref.close(null);
  }
}
