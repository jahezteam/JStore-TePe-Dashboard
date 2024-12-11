import { ChangeDetectorRef, Component } from '@angular/core';
import { filter } from '../../../../pages/shared-module/Models/filterModel';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [ValidateService, MessageService],
})
export class FilterComponent {
  data: filter = {} as filter;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private validationService: ValidateService,
    private changeDetection: ChangeDetectorRef,
    private messageService: MessageService,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    //this.loadPickLists();
    this.data = this.config.data;
  }
  ok() {
    this.ref.close(this.data);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  close() {
    this.ref.close(null);
  }
  clearFilter() {
    this.data = {} as filter;
    this.changeDetection.detectChanges();
    this.ref.close(this.data);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
