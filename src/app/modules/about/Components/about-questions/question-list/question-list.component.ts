import { ChangeDetectorRef, Component } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';
import {
  AboutPermissions,
  AboutUsQuestions,
  QuestionsTitle,
} from '../../../Models/about';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../Services/about.service';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { CreateQuestionComponent } from '../create-question/create-question.component';
import { UpdateQuestionComponent } from '../update-question/update-question.component';
import { AddQuestionsTitleComponent } from '../add-questions-title/add-questions-title.component';
import { DetailsQuestionComponent } from '../details-question/details-question.component';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [SharedModuleModule],
  providers: [MessageService, DialogService, ConfirmationService],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent {
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
        this.date = res.aboutUsQuestions;
        this.filteredDate = res.aboutUsQuestions;
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
    this.ref = this.dialogService.open(CreateQuestionComponent, {
      header: 'Create About Question',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: AboutUsQuestions) => {
      if (item != null) {
        this.service.postQuestion(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Question Created Successfully',
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
    this.ref = this.dialogService.open(AddQuestionsTitleComponent, {
      header: 'Question Title',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: this.mainData,
    });

    this.ref.onClose.subscribe((item: QuestionsTitle) => {
      if (item != null) {
        this.service.updateQuestion(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Question Title Updated Successfully',
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

  openEditPopup(item: AboutUsQuestions) {
    this.service.getGoalById(item.id).subscribe((res: any) => {
      item = res;
    });
    this.editRef = this.dialogService.open(UpdateQuestionComponent, {
      header: 'Edit About Question',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.editRef.onClose.subscribe((item: AboutUsQuestions) => {
      if (item != null) {
        this.service.updateQuestion(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Question updated Successfully',
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
  openDetailsPopup(item: AboutUsQuestions) {
    this.refDetails = this.dialogService.open(DetailsQuestionComponent, {
      header: 'About Question Details',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });
    this.refDetails.onClose.subscribe((item: AboutUsQuestions) => {
      if (item != null) {
      }
    });
  }

  deleteItem(item: AboutUsQuestions) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete This About Question?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteGoal(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Question Deleted Successfully',
            });
            this.date.filter((x: any) => x.id != item.id);
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
