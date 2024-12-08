import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { userPermissions } from '../../Models/userPermissions';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { role } from '../../../roles/Models/role';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
  providers:[ValidateService,DialogService,MessageService]
})
export class AssignRoleComponent implements OnInit , OnDestroy {
  valid=false;
  roles:dropdown[] =[] as dropdown[];
  selectedRole:dropdown={} as dropdown;
  selectedRoles:dropdown[]=[] as dropdown[];
  newRoles:dropdown[]=[] as dropdown[];
  userPermissions=userPermissions;

  constructor(private validationService: ValidateService,private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,public ref:DynamicDialogRef,private messageService:MessageService,
    private pickList:PickListService,
    public config: DynamicDialogConfig,
    private auth:AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
  }

  }
  ngOnInit(): void {
    this.pickList.getRoles().subscribe(res=>{
      this.roles=res;
      this.registerForm();
      this.primengConfig.ripple = true;

    });

  }

  onseletedChanged(){
let added=false;
   this.selectedRoles.forEach(x=>{
    if(x.id.toString()==this.selectedRole.id.toString())
    {
      added=true;
      this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Role added before'});
      return;
    }
   });
     const index = this.newRoles.indexOf(this.selectedRole);
    if (index !== -1) {
      added=true;
      this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Role added before'});
      return;
    }
    // if(this.selectedRoles.indexOf(this.selectedRole)==-1 || (this.newRoles.indexOf(this.selectedRole as dropdown) )==-1)
    // {
      if(!added)
      this.newRoles.push(this.selectedRole);
    // }

    // else{
    //   this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Role added before'});
    // }
  }
  deleteItem(item:dropdown){
    if(item.name==this.selectedRole.name)
    {
      this.selectedRole={name:'',id:''};
    }
    let index=this.newRoles.indexOf(item);
    if(index!=-1)
    {
      this.newRoles.splice(index,1);
    }


  }
  registerForm(){
    if(this.config.data!=null && this.config.data.length>0 )
    {
      this.config.data.forEach((item:role)=>{
        this.selectedRoles.push({id:item.id.toString(),name:item.roleName.toString()} as dropdown);

      });
    }
  }
  isAuth(per:string){
    return this.auth.isAuthorized(per);
  }
  getValidation(){
    return this.newRoles.length==0;
  }
  submit(){
    if(this.newRoles.length>0)
    this.ref.close(this.newRoles);
    else{
      this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'You must select at least one role'});

    }
  }
  cancel(){
    this.ref.close(null);
  }


}

