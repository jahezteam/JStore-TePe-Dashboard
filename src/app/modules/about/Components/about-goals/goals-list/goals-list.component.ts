import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  AboutPermissions,
  AboutUsGoals,
  GoalTitle,
} from '../../../Models/about';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../Services/about.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { CreateGoalsComponent } from '../create-goals/create-goals.component';
import { UpdateGoalsComponent } from '../update-goals/update-goals.component';
import { DetailsGoalsComponent } from '../details-goals/details-goals.component';
import { AddGoalTitleComponent } from '../add-goal-title/add-goal-title.component';

@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [SharedModuleModule],
  providers: [MessageService, DialogService, ConfirmationService],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.scss',
})
export class GoalsListComponent {
  date: any;
  mainData: any;
  aboutPermissions = AboutPermissions;
  filteredDate: any;
  ref: DynamicDialogRef = new DynamicDialogRef();
  editRef: DynamicDialogRef = {} as DynamicDialogRef;
  refDetails: DynamicDialogRef = {} as DynamicDialogRef;
  filter: filter = {} as filter;
  reffilter: DynamicDialogRef = {} as DynamicDialogRef;
  aboutId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AboutService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private AuthService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService,
  ) {
    this.route.params.subscribe((params) => {
      this.aboutId = params['id'];
    });
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getById(this.aboutId).subscribe((res: any) => {
      if (res) {
        this.mainData = res;
        this.date = res.aboutUsGoals;
        this.filteredDate = res.aboutUsGoals;
        this.changeDetection.detectChanges();
      } else {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'Error',
          detail: 'Error occurred Please contact system adminstrator',
        });
      }
    });
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }

  isAuthorized(per: string) {
    return this.AuthService.isAuthorized(per);
  }

  checkString(item: string) {
    return item != null && item != '' && item != ' ';
  }

  openAddPopup() {
    this.ref = this.dialogService.open(CreateGoalsComponent, {
      header: 'Create About Goals',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: AboutUsGoals) => {
      if (item != null) {
        this.service.postGoal(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Goals Created Successfully',
            });
            this.ngOnInit();
          } else {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: 'Error occurred Please contact system adminstrator',
            });
          }
        });

        this.changeDetection.detectChanges();
      }
    });
  }
  openAddTitlePopup() {
    this.ref = this.dialogService.open(AddGoalTitleComponent, {
      header: 'Goals Title',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: this.mainData,
    });

    this.ref.onClose.subscribe((item: GoalTitle) => {
      if (item != null) {
        this.service.updateGoalTitle(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Goals Title Updated Successfully',
            });
            this.ngOnInit();
          } else {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: 'Error occurred Please contact system adminstrator',
            });
          }
        });

        this.changeDetection.detectChanges();
      }
    });
  }

  openEditPopup(item: AboutUsGoals) {
    this.service.getGoalById(item.id).subscribe((res: any) => {
      item = res;
    });
    this.editRef = this.dialogService.open(UpdateGoalsComponent, {
      header: 'Edit About Goals',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.editRef.onClose.subscribe((item: AboutUsGoals) => {
      if (item != null) {
        this.service.updateGoal(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Goals updated Successfully',
            });
            this.ngOnInit();
          } else {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: 'Error occurred Please contact system adminstrator',
            });
          }
        });

        this.changeDetection.detectChanges();
      }
    });
  }
  openDetailsPopup(item: AboutUsGoals) {
    this.refDetails = this.dialogService.open(DetailsGoalsComponent, {
      header: 'About Goals Details',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });
    this.refDetails.onClose.subscribe((item: AboutUsGoals) => {
      if (item != null) {
      }
    });
  }

  deleteItem(item: AboutUsGoals) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete This About Goals?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteGoal(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Goals Deleted Succesfully',
            });
            this.date.filter((x: any) => x.id != item.id);
            console.log(this.date);
          } else {
            this.messageService.add({
              key: 'tl',
              severity: 'error',
              summary: 'Error',
              detail: 'Error occurred Please contact system adminstrator',
            });
          }
        });
      },
    });
  }
}
