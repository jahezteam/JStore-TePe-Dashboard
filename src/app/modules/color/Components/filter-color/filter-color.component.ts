import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';

@Component({
  selector: 'app-filter-colors',
  templateUrl: './filter-color.component.html',
  styleUrls: ['./filter-color.component.scss'],

  providers:[ValidateService,MessageService]
})
export class FilterColorsComponent implements OnInit , OnDestroy {
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
     //this.loadPickLists();
     this.data=this.config.data;
    }

    // loadPickLists(){
    //   this.pickistService.getQuestionLookups().subscribe(res=>{
    //     if(res)
    //     {
    //       this.category=res.categories;
    //       this.type=res.questionTypes;
    //     }
    //     else{
    //       this.messageService.add({key: 'tl', severity:'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator'});
    //     }
    //   });
    // }
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

