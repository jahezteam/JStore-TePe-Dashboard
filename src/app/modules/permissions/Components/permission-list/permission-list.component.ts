import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { permission } from '../../Models/permission';
import { PermissionsService } from '../../Services/permissions.service';
import { CreatePermissionComponent } from '../create-permission/create-permission.component';
import { UpdatePermissionComponent } from '../update-permission/update-permission.component';
import { paginator } from '../../../../pages/shared-module/Models/Paginator';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],

  providers:[MessageService,DialogService]
})
export class PermissionListComponent implements OnInit,OnDestroy  {
  date:permission[] =[] as permission[];
  paginator:paginator ={
    categoryId:0,
    levelId:0,
    pageNumber:1,
    pageSize:5,
    questionTypeId:0,
    searchText:'',
    sortingColumn:'code',
    sortingType:'asc'
  } ;
  filteredDate:permission[] =[] as permission[];
  constructor(private route:ActivatedRoute,private router:Router,private service:PermissionsService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,private changeDetection: ChangeDetectorRef) { }
  ngOnDestroy(): void {
  //   if (this.ref) {
  //     this.ref.close();
  // }
}

  ngOnInit(): void {
    this.loadData();

    this.filteredDate=this.date;
    this.totalPages = this.filteredDate.length / this.pageSize;
    this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
  }
  changePage(page: number) {
    if (page < 0 || page === this.currentPage || page > this.totalPages) {
      return;
    }
    // this.currentPage = page;
    // this.paginator.currentPage=this.currentPage;

    this.service.getPagination(this.paginator).subscribe(res=>{
      if(res)
      {
        // this.data=res.body;
        // this.filteredDate=this.date;

        // this.totalPages = this.filteredDate.length / this.pageSize;
        // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });

  }
  currentPage = 1;
  totalPages: number = 0;
  pager: number[] = [1];
  pageSize: number = 2;

  loadData(){
    this.date=[{
      id:1,
      name:'add user'},
      {
        id:1,
        name:'delete user'},
        {
          id:1,
          name:'update user'},
          {
            id:1,
            name:'crud user'},
            {
              id:1,
              name:'details user'},
              {
                id:1,
                name:'add user'}
];


    this.service.getPagination(this.paginator).subscribe(res=>{
      if(res)
      {
        // this.data=res.body;
        // this.filteredDate=this.date;

        // this.totalPages = this.filteredDate.length / this.pageSize;
        // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });
  }

  routeToAdd(){
      this.router.navigateByUrl("/permissions/add");
  }
  routeToEdit(id:any){
    this.router.navigateByUrl("/permissions/edit/"+id);
}
routeToDetails(id:any){
  this.router.navigateByUrl("/permissions/details/"+id);

}
  ref: DynamicDialogRef = new DynamicDialogRef;
openAddPopup(){
  this.ref = this.dialogService.open(CreatePermissionComponent, {
    header: 'Create Permission',
    width: '50%',
    contentStyle: {"max-height": "550px", "overflow": "auto"},
    baseZIndex: 10000
});

this.ref.onClose.subscribe((item: permission) =>{
    if (item!=null) {
    //  this.filteredDate= this.filterList();
    //  this.paginator.categoryId=this.filter.category.code;
    //  this.paginator.typeId=this.filter.type.code;
    //  this.paginator.levelId=this.filter.difficult.code;
  this.filteredDate.push(item);
     this.service.post(item).subscribe(res=>{
      if(res)
      {
        // this.data=res.body;
        // this.filteredDate=this.date;

        // this.totalPages = this.filteredDate.length / this.pageSize;
        // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.messageService.add({key: 'tl', severity:'succes', summary: 'succes', detail: 'Permission Created Succesfully'});

      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });

     this.changeDetection.detectChanges();
    }
});
}
  editRef: DynamicDialogRef = new DynamicDialogRef;
openEditPopup(item:permission){
  this.editRef = this.dialogService.open(UpdatePermissionComponent, {
    header: 'Edit Permission',
    width: '50%',
    contentStyle: {"max-height": "550px", "overflow": "auto"},
    baseZIndex: 10000,
    data:item
});

this.editRef.onClose.subscribe((item: permission) =>{
    if (item!=null) {
    //  this.filteredDate= this.filterList();
    //  this.paginator.categoryId=this.filter.category.code;
    //  this.paginator.typeId=this.filter.type.code;
    //  this.paginator.levelId=this.filter.difficult.code;
    this.filteredDate.push(item);
     this.service.update(item).subscribe(res=>{
      if(res)
      {
        // this.data=res.body;
        // this.filteredDate=this.date;

        // this.totalPages = this.filteredDate.length / this.pageSize;
        // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
        this.messageService.add({key: 'tl', severity:'succes', summary: 'succes', detail: 'Permission updated Succesfully'});

      }
      else{
        this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
      }
    });

     this.changeDetection.detectChanges();
    }
});
}
// filterList():question[]{
//    return this.date.filter(item=>{
//      return ((this.checkString(this.filter?.difficult?.code ))?item.difficult?.code==this.filter?.difficult?.code: item.difficult?.code)
//      &&
//       ((this.checkString(this.filter?.category?.code ))?item.category?.code==this.filter?.category?.code:item.category?.code )
//       &&
//       ((this.checkString(this.filter?.type?.code ))?item.type?.code==this.filter?.type?.code:item.type?.code)
//   });
// }
checkString(item:string){
  return item!=null &&item!='' &&item!=' ';
}
searchInput(event:any){
  this.paginator.searchText=event?.target?.value;
 this.filteredDate=this.date.filter(item=>item.name.search(new RegExp(event.target.value, 'i')) > -1);
 this.service.getPagination(this.paginator).subscribe(res=>{
  if(res)
  {
    // this.data=res.body;
    // this.filteredDate=this.date;

    // this.totalPages = this.filteredDate.length / this.pageSize;
    // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
  }
  else{
    this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
  }
});

}
  deleteItem(item:permission){
      if(this.date.indexOf(item)!=-1)
      {
        this.date.splice(this.date.indexOf(item),1)
      }
      this.service.delete(item.id).subscribe(res=>{
        if(res)
        {
          // this.data=res.body;
          // this.filteredDate=this.date;

          // this.totalPages = this.filteredDate.length / this.pageSize;
          // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
          this.messageService.add({key: 'tl', severity:'success', summary: 'success', detail: 'Permission Deleted Succesfully'});

        }
        else{
          this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
        }
      });
    }

}
