import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { filter } from 'app/pages/shared-module/Models/filterModel';
import { ProductPermissions } from '../../Models/productPermissions';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss'],

  providers:[ValidateService,MessageService]
})
export class FilterProductComponent implements OnInit , OnDestroy {

  data:filter={} as filter;
  ProductPermission=ProductPermissions;
    constructor(
      public config: DynamicDialogConfig,public ref:DynamicDialogRef,private validationService: ValidateService,
      private changeDetection: ChangeDetectorRef,private pickistService:PickListService,
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
      this.data={isActive:true,isDeleted:false} as filter;
      this.ref.close(this.data)
    }

  }

