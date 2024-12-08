import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { role } from '../../Models/role';
import { rolePermissions } from '../../Models/rolePermissions';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { permission } from '../../../permissions/Models/permission';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit , OnDestroy {
  valid=false;
  rolePermissions=rolePermissions;
  allPermissions:allPermissions=new allPermissions();

  form: role = {
    id:0,
    roleName:'',
    permissions:[]
  };

  constructor(private primengConfig: PrimeNGConfig,
    public ref:DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth:AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
  }

  }

  ngOnInit(): void {
    this.registerForm();
    this.allPermissions.fillPermissions();

    this.primengConfig.ripple = true;
  }
  isAuth(per:string){
    return this.auth.isAuthorized(per);
  }
  isChecked(item:string){
    let per =this.form.permissions.find((x:permission)=>x.name==item) as permission;
    let index=this.form.permissions.indexOf(per)
    return index != -1;
  }
  registerForm(){
    this.form = {
      id:this.config.data?.id,
      roleName:this.config.data?.roleName,
      permissions:this.config.data?.permissions

    };

  }

  submit(){

    this.ref.close(null);
  }
  cancel(){
    this.ref.close(null);
  }


}

