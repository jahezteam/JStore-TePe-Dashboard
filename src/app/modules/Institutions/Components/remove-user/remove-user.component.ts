import { Component } from '@angular/core';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { InstitutionPermissions } from '../../Models';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { PickListService } from 'app/pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { user } from '../../../users/Models/user';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-remove-user',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './remove-user.component.html',
  styleUrl: './remove-user.component.scss',
  providers: [ValidateService, DialogService, MessageService],
})
export class RemoveUserComponent {
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
  deleteItem(item: dropdown) {
    this.data.usersIds.push(item.id);
    this.selectedUsers = this.selectedUsers.filter((x) => x.id != item.id);
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
    if (this.selectedUsers.length > 0) this.ref.close(this.data);
    else {
      this.messageService.add({
        key: 'tl',
        severity: 'warn',
        summary: 'warn',
        detail: 'You must select at least one role',
      });
    }
  }
  cancel() {
    this.ref.close(null);
  }
}
