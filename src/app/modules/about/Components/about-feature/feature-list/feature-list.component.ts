import { ChangeDetectorRef, Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { AboutPermissions, AboutUsFeacturers } from '../../../Models/about';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../Services/about.service';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { AuthenticationService } from '../../../../auth/services/authentication.service';
import { CreateFeatureComponent } from '../create-feature/create-feature.component';
import { UpdateFeatureComponent } from '../update-feature/update-feature.component';
import { DetailsFeatureComponent } from '../details-feature/details-feature.component';
import { SharedModuleModule } from '../../../../../pages/shared-module/shared-module.module';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss',
  providers: [MessageService, DialogService, ConfirmationService],
})
export class FeatureListComponent {
  date: any;
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
        console.log(res);
        this.date = res.aboutUsFeacturers;
        this.filteredDate = res.aboutUsFeacturers;
        console.log(this.filteredDate);
        // this.totalPages = res.totalPages;
        // this.pager = Array.from({ length: this.totalPages }, (v, k) => k + 1);
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
    this.ref = this.dialogService.open(CreateFeatureComponent, {
      header: 'Create About',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((item: AboutUsFeacturers) => {
      if (item != null) {
        this.service.postFeature(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Feature Created Succesfully',
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
  openEditPopup(item: AboutUsFeacturers) {
    this.service.getFeatureById(item.id).subscribe((res: any) => {
      item = res;
    });
    this.editRef = this.dialogService.open(UpdateFeatureComponent, {
      header: 'Edit About Feature',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });

    this.editRef.onClose.subscribe((item: AboutUsFeacturers) => {
      if (item != null) {
        this.service.updateFeature(item).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About updated Successfully',
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
  openDetailsPopup(item: AboutUsFeacturers) {
    this.refDetails = this.dialogService.open(DetailsFeatureComponent, {
      header: 'About Feature Details',
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: item,
    });
    this.refDetails.onClose.subscribe((item: AboutUsFeacturers) => {
      if (item != null) {
      }
    });
  }

  deleteItem(item: AboutUsFeacturers) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete This About Feature?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteFeature(item.id).subscribe((res: any) => {
          if (res) {
            this.messageService.add({
              key: 'tl',
              severity: 'success',
              summary: 'success',
              detail: 'About Feature Deleted Succesfully',
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
