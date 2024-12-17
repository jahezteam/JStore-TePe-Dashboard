import { ChangeDetectorRef, Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { Question, QuestionsPermissions } from '../../../Models/questions';
import { QuestionsService } from '../../../Services/questions.service';
import { CreateQuestionComponent } from '../create-question/create-question.component';
import { UpdateQuestionComponent } from '../update-question/update-question.component';
import { DetailsQuestionComponent } from '../details-question/details-question.component';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-list-question',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './list-question.component.html',
  styleUrl: './list-question.component.scss',
  providers: [MessageService, DialogService, ConfirmationService],
})
export class ListQuestionComponent {
  date: any;
  questionsPermissions = QuestionsPermissions;
  filteredDate: any;
  ref: DynamicDialogRef = new DynamicDialogRef();
  editRef: DynamicDialogRef = {} as DynamicDialogRef;
  refDetails: DynamicDialogRef = {} as DynamicDialogRef;
  filter: filter = {} as filter;
  reffilter: DynamicDialogRef = {} as DynamicDialogRef;
  questionTypeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionsService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private AuthService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService,
  ) {
    this.route.params.subscribe((params) => {
      this.questionTypeId = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.service
      .getQuestionTypeById(this.questionTypeId)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.date = res.questions;
          this.filteredDate = res.questions;
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
      header: 'Create Question',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: Question) => {
      if (item != null) {
        this.service.postQuestion(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Question  Created Succesfully',
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
  openEditPopup(item: Question) {
    this.service.getQuestionById(item.id).subscribe((res: any) => {
      item = res;
    });
    this.editRef = this.dialogService.open(UpdateQuestionComponent, {
      header: 'Edit Question ',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.editRef.onClose.subscribe((item: Question) => {
      if (item != null) {
        this.service.updateQuestion(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Question updated Successfully',
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
  openDetailsPopup(item: Question) {
    this.refDetails = this.dialogService.open(DetailsQuestionComponent, {
      header: 'Question  Details',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });
    this.refDetails.onClose.subscribe((item: Question) => {
      if (item != null) {
      }
    });
  }

  deleteItem(item: Question) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete This Question ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteQuestion(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'Question  Deleted Succesfully',
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
      },
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
