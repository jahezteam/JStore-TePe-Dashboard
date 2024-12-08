import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [ValidateService, MessageService, DialogService, DatePipe]
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  @Input() UserId: number = 0;
  @Input() isProfileEdit: boolean = false;
  @Output() updateFinished = new EventEmitter<boolean>();


  valid = false;
  userPermissions = userPermissions;
  public countries: any = countries;
  selectedCountry: any = "";
  id: any;
  passwordMatched = false;
  roles: dropdown[] = [] as dropdown[];
  permissions: dropdown[] = [] as dropdown[];
  selectedRole: dropdown = {} as dropdown;
  selectedPermission: dropdown = {} as dropdown;
  form: any = {
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    email: '',
    idNumber: '',
    job: '',
    password: '',
    permissions: [],
    phoneNumber: '',
    roles: [],
    userName: '',
    confirmPassword: '',
    isAdmin: false

  };
  constructor(private validationService: ValidateService, private service: UsersService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig,
    private router: Router, public dialogService: DialogService, private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef, private picklistService: PickListService,
    private datepipe: DatePipe, private auth: AuthenticationService) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.id = this.UserId > 0 ? this.UserId : this.route.snapshot.paramMap.get('id');
    this.loadData(this.id);
  }
  loadData(id: any) {
    this.service.getById(id).subscribe((res:any) => {
      if (res) {
        this.form = res;
        this.selectedCountry = this.countries.filter((x: any) => x.name == this.form.nationality)[0];
        this.form.birthDate = this.datepipe.transform(res.birthDate, 'MM/dd/yyyy');
        this.changeDetection.detectChanges();
        this.loadPickLists();

      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  loadImage(userName: string) {
    this.service.getImage(userName).subscribe((res: any) => {
      if (res) {
        const mimeType = res.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (_event) => {
          this.url = reader.result;
          this.changeDetection.detectChanges();
        }
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  routrToList() {
    this.router.navigateByUrl("/users/list");
  }
  routrToUrl() {
    this.router.navigateByUrl("/users/Profile/" + this.UserId);
  }
  formItems: string[]=[] as string[];
  registerForm() {
    this.selectedPermission = {} as dropdown;;
    this.selectedRole = {} as dropdown;;
    this.formItems = ["firstName", "lastName", "idNumber", "userName", "phoneNumber",
      "job", "birthDate", "email"];
    this.validationService.registerForm(this.formItems);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status)
    );
    this.validInput();
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  loadPickLists() {
    // this.picklistService.getPermissions().subscribe(res=>{
    //   if(res)
    //   {
    //     this.permissions=res;
    //     this.registerForm();
    //     this.primengConfig.ripple = true;
    //     this.changeDetection.detectChanges();
    //   }
    //   else{
    //     this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
    //   }
    // });
    this.picklistService.getRoles().subscribe(res => {
      if (res) {
        this.roles = res;
        this.registerForm();
        this.primengConfig.ripple = true;
        this.loadImage(this.form.userName);
        this.changeDetection.detectChanges();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  isInputValid(name: string, status: boolean) {

    this.validationService.updateFormFlag(name, status);
  }

  onChanged() {

  }
  onseletedRoleChanged() {
    // if(this.form.roles.indexOf(this.selectedRole)==-1)
    //   this.form.roles.push(this.selectedRole);
    //   else{
    //     this.messageService.add({key: 'tl', severity:'warn', summary: 'warn', detail: 'This Role added before'});
    //   }
  }
  // onseletedPermissionChanged(){
  //   if(this.form.permissions.indexOf(this.selectedPermission)==-1)
  //     this.form.permissions.push(this.selectedPermission);
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
  //   let index=this.form.roles.indexOf(item);
  //   if(index!=-1)
  //   this.form.roles.splice(index,1);


  // }
  deleteItem(item: dropdown) {
    let index = this.form.roles.indexOf(item);
    if (index != -1)
      this.form.roles = this.form.roles.slice(0, index).concat(this.form.roles.slice(index + 1));
  }
  // deletePermission(item:dropdown){
  //   if(item.name==this.selectedPermission.name)
  //   {
  //     this.selectedPermission={name:'',id:''};
  //   }
  //   let index=this.form.permissions.indexOf(item);
  //   if(index!=-1)
  //   this.form.permissions.splice(index,1);


  // }
  private validInput() {
    this.formItems.forEach(x => {
      this.isInputValid(x, true)
    })
  }
  imagePath: number=0;
  url: any;
  file: any = null;
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
  submit() {
    /*if (this.form.roles.length == 0) {
      this.messageService.add({ key: 'tl', severity: 'warn', summary: 'Warning', detail: 'You must add at least one Role' });
      return;
    }*/
    // if(this.form.permissions.length==0)
    // {
    //   this.messageService.add({key: 'tl', severity:'warn', summary: 'Warning', detail: 'You must add at least one Permission'});
    //   return;
    // }
    this.form.nationality = this.selectedCountry?.name;

    const formData = new FormData();
    formData.append('command', JSON.stringify(this.form));
    if (this.file !== null)
      formData.append('file', this.file, this.file.name);
    this.service.updateFormData(formData).subscribe((res:any) => {
      // this.service.update(this.form).subscribe(res=>{
      if (res.succeeded) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'User Updated Succesfully' });
        if (this.isProfileEdit) {
          this.updateFinished.emit(true);
        }
        else {
          this.routrToList();
        }
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: res.errors[0] });
        this.updateFinished.emit(false);
      }
    });
  }
  cancel() {
  }

}

