import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';

@Component({
  selector: 'app-filter-users',
  templateUrl: './filter-users.component.html',
  styleUrls: ['./filter-users.component.scss'],

  providers:[ValidateService,MessageService]
})
export class FilterUsersComponent implements OnInit , OnDestroy {
  data:filter={} as filter;
    constructor(
      public config: DynamicDialogConfig,public ref:DynamicDialogRef,private validationService: ValidateService,
      private changeDetection: ChangeDetectorRef,
      private messageService:MessageService,   private auth:AuthenticationService) { }
    ngOnDestroy(): void {
      if (this.ref) {
        this.ref.close();
    }
    }

    ngOnInit(): void {
     this.data=this.config.data;
    }
    ok(){
       this.ref.close(this.data);
    }
    isAuth(per:string){
      return this.auth.isAuthorized(per);
    }
    close(){
      this.ref.close(null);
    }
    clearFilter(){
      this.data={} as filter;
      this.changeDetection.detectChanges();
      this.ref.close(this.data)
    }

  }

