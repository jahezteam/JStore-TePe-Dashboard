import { getLocaleDateFormat } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { changeUserPassword } from '../../Models/changePassword';
import { user } from '../../Models/user';
import { userPermissions } from '../../Models/userPermissions';
import { UsersService } from '../../Services/users.service';
import { AssignRoleComponent } from '../assign-role/assign-role.component';
import { ChangeUserPasswordComponent } from '../change-user-password/change-user-password.component';
import { FilterUsersComponent } from '../filter-users/filter-users.component';
import { RemoveRoleComponent } from '../remove-role/remove-role.component';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';
import { environment } from '../../../../../environments/environment';
import { role } from '../../../roles/Models/role';
import { permission } from '../../../permissions/Models/permission';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from 'app/pages/shared-module/Models/dropDown';
import { filter } from 'app/pages/shared-module/Models/filterModel';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'] ,
  providers:[MessageService,DialogService,ConfirmationService]
})
export class UserListComponent implements OnInit,OnDestroy {
date:user[] =[] as user[];
userPermissions=userPermissions;
// filter:filter ={} as filter;

paginator:paginator ={
  categoryId:0,
  levelId:0,
  pageNumber:1,
  pageSize:environment.pageSize,
  questionTypeId:0,
  searchText:'',
  sortingColumn:'code',
  sortingType:'asc'
} ;


filteredDate:user[] =[] as user[];

roles:role[]=[] as role[];
  permissions:permission[]=[] as permission[];
  constructor(private route:ActivatedRoute,private router:Router,private service:UsersService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,private changeDetection: ChangeDetectorRef,
    private confirmationService: ConfirmationService,private auth:AuthenticationService) { }
  ngOnDestroy(): void {
    if (this.ref) {
      // this.ref.close();
  }

  }

  ngOnInit(): void {
    this.loadData();

  }
  changePage(page: number) {
    if (page < 0 || page === this.currentPage || page > this.totalPages) {
      return;
    }
     this.currentPage = page;
     this.paginator.pageNumber=this.currentPage;

    this.service.getPagination(this.paginator).subscribe((res:any)=>{
      if(res)
      {
        this.date=res.items;
        this.filteredDate=this.date;

        this.totalPages = res.totalPages;
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });

  }
  isAuth(per:string){
    return this.auth.isAuthorized(per);
  }
  changePageSize(pageSize: number) {

    this.paginator.pageNumber=1;
    this.paginator.pageSize=pageSize;

    this.service.getPagination(this.paginator).subscribe((res:any)=>{
      if(res)
      {
        this.date=res.items;
        this.filteredDate=this.date;

        this.totalPages = res.totalPages;
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });

 }
  currentPage = 1;
  totalPages: number = 0;
  pager: number[] = [1];
  pageSize: number = environment.pageSize;

  loadData(){

    this.service.getPagination(this.paginator).subscribe((res:any)=>{
      if(res)
      {
        this.date=res.items;
        this.filteredDate=this.date;
        this.totalPages = res.totalPages;
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });
  }
  assignRoleRef: DynamicDialogRef={} as DynamicDialogRef;
  AssignRole(item:user){
    this.assignRoleRef = this.dialogService.open(AssignRoleComponent, {
      header: 'Assign Roles to user',
      width: '50%',
      contentStyle: {"max-height": "550px", "overflow": "auto"},
      baseZIndex: 10000,
      data:item.roles
  });
  this.assignRoleRef.onClose.subscribe((items: dropdown[]) =>{
      if (items!=null) {
       this.service.assignToRoles(item.id,items).subscribe((res:any)=>{
        if(res.succeeded)
        {
          this.messageService.add({key: 'tl', severity:'success', summary: 'success', detail: 'Roles Added Succesfully'});
          this.ngOnInit();
        }
        else{
          this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
        }
      });

       this.changeDetection.detectChanges();
      }
  });
  }
  removeRoleRef: DynamicDialogRef={} as DynamicDialogRef;
  RemoveRole(item:user){
    this.assignRoleRef = this.dialogService.open(RemoveRoleComponent, {
      header: 'Remove Roles from user',
      width: '50%',
      contentStyle: {"max-height": "550px", "overflow": "auto"},
      baseZIndex: 10000,
      data:item.roles
  });

  this.assignRoleRef.onClose.subscribe((items: dropdown[]) =>{
      if (items!=null) {
       this.service.removeFromRoles(item.id,items).subscribe((res:any)=>{
        if(res)
        {
          this.messageService.add({key: 'tl', severity:'success', summary: 'success', detail: 'Role updated Succesfully'});
          this.ngOnInit();
        }
        else{
          this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
        }
      });

       this.changeDetection.detectChanges();
      }
  });
  }
  routeToAdd(){
      this.router.navigateByUrl("/users/add");
  }
  userPackages(id:number){
    this.router.navigateByUrl("/package/UserPackages/admin/"+id);
  }
  logOut(item:any){
this.auth.logoutUser(item.id).subscribe(res=>{
  if(res)
  {
    this.messageService.add({key: 'tl', severity:'success', summary: 'success', detail: 'Logged Out success'});
this.ngOnInit();
  }
});
  }
  routeToEdit(id:any){
    this.router.navigateByUrl("/users/edit/"+id);
}
routeToDetails(id:any){
  this.router.navigateByUrl("/users/details/"+id);

}
filter: filter = {} as filter;
ref: DynamicDialogRef={} as DynamicDialogRef;
openFilterPopup(){
  this.ref = this.dialogService.open(FilterUsersComponent, {
    header: 'Filter Users',
    width: '50%',
    contentStyle: {"max-height": "550px", "overflow": "auto"},
    baseZIndex: 10000,
    data:this.filter
});

this.ref.onClose.subscribe((data: filter) =>{
    if (data!=null) {
     this.filter=data;
     this.paginator.pageNumber = 1;
     this.paginator.pageSize = environment.pageSize;
     this.paginator.searchText = '';
     this.paginator.sortingColumn = 'code';
     this.paginator.sortingType = 'asc';

     this.service.getPaginationFilter(this.filter.isActive,this.paginator).subscribe((res:any)=>{
      if(res)
      {
        this.date = res.result as any;
        this.filteredDate = this.date;
        this.totalPages = res.totalPages
        this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.changeDetection.detectChanges();
      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });

     this.changeDetection.detectChanges();
    }
});
}
// filterList():user[]{
  //  return this.date.filter(item=>{
  //    return ((this.checkString(this.filter?.difficult?.code ))?item.difficult?.code==this.filter?.difficult?.code: item.difficult?.code)
  //    &&
  //     ((this.checkString(this.filter?.category?.code ))?item.category?.code==this.filter?.category?.code:item.category?.code )
  //     &&
  //     ((this.checkString(this.filter?.type?.code ))?item.type?.code==this.filter?.type?.code:item.type?.code)
  // });
// }
checkString(item:string){
  return item!=null &&item!='' &&item!=' ';
}
searchInput(event:any){
  this.paginator.searchText=event?.target?.value;
  this.paginator.pageNumber=1;
 this.service.search(this.paginator,true).subscribe((res:any)=>{
  if(res)
  {
    this.date=res.items;
    this.filteredDate=this.date;
    this.totalPages = res.totalPages;
    this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
    this.changeDetection.detectChanges();
  }
  else{
    this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
  }
});

}
  deleteItem(item:user){
    this.confirmationService.confirm({
      message: "Are you sure you want to Delete This User",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.delete(item.id).subscribe((res:any)=>{
          if(res)
          {
            this.messageService.add({key: 'tl', severity:'success', summary: 'success', detail: 'User Deleted Succesfully'});
            this.ngOnInit();

          }
          else{
            this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
          }
        });
      },
    });

    }
    exportData(){
      this.service.exportData().subscribe((res:any)=>{
        if (res) {
          this.service.download(res);
        }
        else {
          this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Error" });
        }
      }
        , (error:any) => {
          this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: error });

        });
    }
    changePassRef: DynamicDialogRef={} as DynamicDialogRef;
    changePassword(item:user){
      this.changePassRef = this.dialogService.open(ChangeUserPasswordComponent, {
        header: 'Change User Password',
        width: '50%',
        contentStyle: {"max-height": "550px", "overflow": "auto"},
        baseZIndex: 10000,
        data:item.roles
    });
    this.changePassRef.onClose.subscribe((items: changeUserPassword) =>{
        if (items!=null) {
         this.service.changePassword({userId:item.id,password:items.newPassword}).subscribe((res:any)=>{
          if(res.succeeded)
          {
            this.messageService.add({key: 'tl', severity:'success', summary: 'success', detail: 'Password Changed Succsfully'});
            //this.ngOnInit();
          }
          else{
            this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
          }
        });

         this.changeDetection.detectChanges();
        }
    });
    }

}
