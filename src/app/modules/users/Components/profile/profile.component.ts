import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UsersService } from '../../Services/users.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService, DialogService, DatePipe]
})
export class ProfileComponent implements OnInit {
  id: any;
  url: any;
  isEdit: boolean = false;

  //userPermissions=userPermissions;
  passwordMatched = true;
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
  constructor(private service: UsersService,
    private messageService: MessageService,
    private router: Router, public dialogService: DialogService, private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef, private picklistService: PickListService,
    private datepipe: DatePipe, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.isEdit = false;
    this.id = this.route.snapshot.paramMap.get('id');

    this.loadData(this.id);
  }
  file: any = null;
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('UserName', this.form.userName);
    formData.append('UserId', this.form.id);
    formData.append('Image', fileToUpload, fileToUpload.name);

    this.service.changeImage(formData).subscribe((res:any) => {
      if (res) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'User Updated Succesfully' });
        window.location.reload();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
    //     const mimeType = files[0].type;
    //   if(mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    // const reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.url = reader.result;
    //   this.changeDetection.detectChanges();
    // }
    // this.file = fileToUpload;
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  canEdit() {
    this.isEdit = !this.isEdit;

  }
  afetrUpdate(flag: boolean) {
    if (flag) {
      this.ngOnInit();
    }

  }
  loadData(id: any) {
    this.service.getById(id).subscribe((res:any) => {
      if (res) {
        this.form = res;
        this.form.birthDate = this.datepipe.transform(res.birthDate, 'MM/dd/yyyy')?.toString();
        this.service.getImage(this.form.userName).subscribe((res: any) => {
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
            // this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
          }
        });
        this.changeDetection.detectChanges();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  routrToList() {
    this.router.navigateByUrl("/users/list");
  }

  cancel() {
  }

}


