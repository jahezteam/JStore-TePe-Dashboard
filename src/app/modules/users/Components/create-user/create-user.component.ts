import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { systemUser, user } from '../../Models/user';
import { userPermissions } from '../../Models/userPermissions';
import { UsersService } from '../../Services/users.service';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { countries } from '../../../../pages/shared-module/Models/countries-store';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [ValidateService, MessageService, DialogService]
})
export class CreateUserComponent implements OnInit, OnDestroy {
  valid = false;
  userPermissions = userPermissions;

  passwordMatched = false;
  roles: dropdown[] = [] as dropdown[];
  permissions: dropdown[] = [] as dropdown[];
  selectedRoles: dropdown[] = [] as dropdown[];
  selectedRole: dropdown = {} as dropdown;
  selectedPermissions: dropdown[] = [] as dropdown[];
  selectedPermission: dropdown = {} as dropdown;
  public countries: any = countries;
  selectedCountry: any = "";

  form: systemUser = {
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date("01/01/2000"),
    email: '',
    idNumber: '',
    job: '',
    password: '',
    permissions: [],
    phoneNumber: '',
    roles: [],
    userName: '',
    confirmPassword: '',
    isAdmin: true,
    nationality: ''
  };
  constructor(private validationService: ValidateService,
    private service: UsersService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private picklistService: PickListService,
    private auth: AuthenticationService) { }
  ngOnDestroy(): void {
    //   if (this.ref) {
    //     this.ref.close();
    // }
  }
  ngOnInit(): void {
    this.registerForm();
    this.loadPickLists();
    this.primengConfig.ripple = true;
  }
  routrToList() {
    this.router.navigateByUrl("/users/list");
  }
  addQuestion() {

  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  // ref: DynamicDialogRef;
  // show(){
  //   this.ref = this.dialogService.open(AddNormalTypeComponent, {
  //     header: 'Create a Normal type',
  //     width: '50%',
  //     contentStyle: {"max-height": "500px", "overflow": "auto"},
  //     baseZIndex: 10000
  // });

  // this.ref.onClose.subscribe((type: NormalType) =>{
  //     if (type!=null) {
  //      this.form.normalTypeData.push(Object.assign({}, type));
  //      this.changeDetection.detectChanges();

  //     }
  // });
  // }
  imagePath: number=0;
  url: any;
  uploadUrl:string='../';


  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    // formData.append('file', fileToUpload, fileToUpload.name);
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      this.changeDetection.detectChanges();
    }
    this.file = fileToUpload;
  }

  registerForm() {
    this.selectedPermission = {} as dropdown;;
    this.selectedRole = {} as dropdown;;
    this.validationService.registerForm(["firstName", "lastName", "idNumber", "userName", "phoneNumber",
      "email", "password", "confirmPassword", "birthDate", "job"]);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status)
    );
  }
  loadPickLists() {
    // this.picklistService.getPermissions().subscribe(res=>{
    //   if(res)
    //   {
    //     this.permissions=res;
    //     this.changeDetection.detectChanges();
    //   }
    //   else{
    //     this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
    //   }
    // });
    this.picklistService.getRoles().subscribe(res => {
      if (res) {
        this.roles = res;
        this.changeDetection.detectChanges();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  isInputValid(name: string, status: boolean) {
    if (name == 'confirmPassword') {
      if (this.form.password == this.form.confirmPassword) {
        this.passwordMatched = true;
        this.validationService.updateFormFlag(name, true);

      }
      else {
        this.passwordMatched = false;
        this.validationService.updateFormFlag(name, false);
      }
    }
    else
      this.validationService.updateFormFlag(name, status);
  }

  onChanged() {

  }
  onseletedRoleChanged() {
    // if(this.selectedRoles.indexOf(this.selectedRole)==-1)
    //   this.selectedRoles.push(this.selectedRole);
    //   else{
    //     this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Role added before'});
    //   }
  }
  // onseletedPermissionChanged(){
  //   if(this.selectedPermissions.indexOf(this.selectedPermission)==-1)
  //     this.selectedPermissions.push(this.selectedPermission);
  //     else{
  //       this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Permission added before'});
  //     }
  // }
  getValidation() {
    return !this.valid;
  }
  // deleteItem(item:dropdown){
  //   if(item.name==this.selectedRole.name)
  //   {
  //     this.selectedRole={name:'',id:''};
  //   }
  //   let index=this.selectedRoles.indexOf(item);
  //   if(index!=-1)
  //   this.selectedRoles.splice(index,1);


  // }
  deleteItem(item: dropdown) {
    let index = this.selectedRoles.indexOf(item);
    if (index != -1)
      this.selectedRoles = this.selectedRoles.slice(0, index).concat(this.selectedRoles.slice(index + 1));
  }
  // deletePermission(item:dropdown){
  //   if(item.name==this.selectedPermission.name)
  //   {
  //     this.selectedPermission={name:'',id:''};
  //   }
  //   let index=this.selectedPermissions.indexOf(item);
  //   if(index!=-1)
  //   this.selectedPermissions.splice(index,1);


  // }
  file: any = null;
  submit() {
    if (false){//this.selectedRoles.length == 0) {
      this.messageService.add({ key: 'tl', severity: 'warn', summary: 'Warning', detail: 'You must add at least one Role' });
      return;
    }
    else {
      this.selectedRoles.forEach(x => {
        this.form.roles.push(x);
      });
    }
    // if(this.selectedPermissions.length==0)
    // {
    //   this.messageService.add({key: 'tl', severity:'warn', summary: 'Warning', detail: 'You must add at least one Permission'});
    //   return;
    // }
    // else{
    //   this.selectedPermissions.forEach(x=>{
    //     this.form.permissions.push(x);
    //   });
    // }
    this.form.nationality = this.selectedCountry?.name;
    const formData = new FormData();
    formData.append('command', JSON.stringify(this.form));
    if (this.file !== null)
      formData.append('file', this.file, this.file.name);
    this.service.postFormdata(formData).subscribe((res:any) => {
      if (res.succeeded) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'User Created Succesfully' });
        this.clearInputs();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: res.errors[0] });
      }
    }
      , (error:any) => {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: error });

      });
  }
  Reset() {
    this.clearInputs();
  }
  clearInputs() {
    this.valid = false;
    this.passwordMatched = false;
    // this.roles=[] as dropdown[];
    // this.permissions=[] as dropdown[];
    this.imagePath = 0;
    this.url = '';
    this.file = null;
    this.selectedRoles = [] as dropdown[];
    this.selectedRole = {} as dropdown;
    this.selectedPermissions = [] as dropdown[];
    this.selectedPermission = {} as dropdown;
    this.form = {
      id: 0,
      firstName: '',
      lastName: '',
      birthDate: new Date("01/01/2000"),
      email: '',
      idNumber: '',
      job: '',
      password: '',
      permissions: [],
      phoneNumber: '',
      roles: [],
      userName: '',
      confirmPassword: '',
      isAdmin: true,
      nationality: ''

    };
    this.changeDetection.detectChanges();

  }


}

