import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { userPermissions } from '../../modules/users/Models/userPermissions';
import { UsersService } from '../../modules/users/Services/users.service';
import { AuthenticationService } from '../../modules/auth/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]

})
export class DashboardComponent implements OnInit {

  userPermissions = userPermissions;
  userNationalitiesData:any;
  userId: number = 0;
  constructor(private router: Router, private changeDetection: ChangeDetectorRef,
    private messageService: MessageService,
    public dialogService: DialogService,
    private userService:UsersService,
    private detect:ChangeDetectorRef,
    private auth: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  ref: DynamicDialogRef={} as DynamicDialogRef;
  file: any = null;

  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }

  chartData:any;
  isHorizontal:boolean=false;
  loadData() {
/*
  
    this.userService.getAdminDashboardUserData().subscribe((res:any)=>{
      this.chartData=res;
      this.userNationalitiesData=this.chartData.userNationalitiesData;
      this.detect.detectChanges();
    })*/
  }

  exportUserNationalitiesData(){
    this.userService.exportUserNationalitiesData().subscribe((res:any)=>{
      if (res) {
        this.userService.download(res);
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Error" });
      }
    }
      , (error:any) => {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: error });

      });
  }
  exportUsersJoinedLAst6Months(){
    this.userService.exportUsersJoinedLAst6Months().subscribe((res:any)=>{
      if (res) {
        this.userService.download(res);
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Error" });
      }
    }
      , (error:any) => {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: error });

      });
  }
  exportUsersSubscription(){
    this.userService.exportUsersSubscription().subscribe((res:any)=>{
      if (res) {
        this.userService.download(res);
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Error" });
      }
    }
      , (error:any) => {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: error });

      });
  }
  GetUsersLoggedInLAstWeek(){
    this.userService.GetUsersLoggedInLAstWeek().subscribe((res:any)=>{
      if (res) {
        this.userService.download(res);
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: "Error" });
      }
    }
      , (error:any) => {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: error });

      });
  }
  getData(type:Number){
    switch(type)
    {
      case 1:
        this.exportUserNationalitiesData();
        break;
        case 2:
          this.exportUsersJoinedLAst6Months();
          break;
           case 3:
            this.exportUsersSubscription();
          break;
            case 4:
              this.GetUsersLoggedInLAstWeek();
          break;
           case 5:
          break;
          case 6:
          break;
           case 7:
          break;
            case 8:
          break;
           case 9:
          break;
    }
  }

}
