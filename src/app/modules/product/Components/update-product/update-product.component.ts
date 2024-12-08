import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { ProductPermissions } from '../../Models/productPermissions';
import { product } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { picklist } from 'app/pages/shared-module/Models/pickList';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  providers: [ValidateService, MessageService, DialogService, ConfirmationService]

})
export class UpdateProductComponent implements OnInit, OnDestroy {
  valid = false;
  ProductPermission = ProductPermissions;
  id: any = 0;
  searchValue:string='';
  mainCategories:picklist[]=[] as picklist[];
  categories:picklist[]=[] as picklist[];
  selectedCategory:picklist={} as picklist;
  selectedMainCategory:picklist={} as picklist;
  form: product = {
    id: 0,
    titleAr: '',
    titleEn: '',
    longDescriptionAr: '',
    longDescriptionEn: '',
    shortDescriptionAr: '',
    shortDescriptionEn: '',
    modelNumber: '',
    categoryId:'',
    colors:[],
    isActive: true,
    isDeleted: false,
  };
  constructor(private validationService: ValidateService, private service: ProductService,
    private messageService: MessageService, private primengConfig: PrimeNGConfig,
    private router: Router, public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef, private picklistService: PickListService,
    private confirmationService: ConfirmationService, private route: ActivatedRoute, private auth: AuthenticationService) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.searchValue = this.route.snapshot.paramMap.get('searchValue')!;

    this.getData(this.id);
    this.primengConfig.ripple = true;
  }
  getData(id: any) {
    this.service.getById(id).subscribe((res:any) => {
      if (res) {
        this.form = res;
        this.registerForm();
        // this.loadImage(this.form.code);
        this.changeDetection.detectChanges();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  loadImage(code: string) {
    this.service.getImage(code).subscribe((res: any) => {
      if (res) {
        const mimeType = res.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (_event) => {
          this.url = reader.result;
          this.changeDetection.detectChanges();
        }
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  routrToList() {
    this.router.navigateByUrl("/product/list/"+this.searchValue);
  }
  formItems: string[] = [];
  registerForm() {

    this.formItems = ["titleAr", "titleEn", "modelNumber",
      "shortDescriptionAr","shortDescriptionEn","longDescriptionAr","longDescriptionEn"];
    this.validationService.registerForm(this.formItems);
    this.validationService.validStatus.subscribe(
      (status) => (this.valid = status)
    );
    this.validInput();
  }
  isInputValid(name: string, status: boolean) {
    this.validationService.updateFormFlag(name, status);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  getValidation() {
    return !this.valid ;
  }
  private validInput() {
    this.formItems.forEach(x => {
      this.isInputValid(x, true)
    })
  }
  imagePath: number=0;
  url: any;
  file: any = null;
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    // formData.append('file', fileToUpload, fileToUpload.name);
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      this.changeDetection.detectChanges();
    }
    this.file = fileToUpload;
  }
  submit() {
 
    const formData = new FormData();
    formData.append('command', JSON.stringify(this.form));
    if (this.file !== null)
      formData.append('file', this.file, this.file.name);
    this.service.updateFormData(formData).subscribe((res:any) => {
      // this.service.update(this.form).subscribe(res=>{
      if (res) {
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'Product Updated Succesfully' });
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
}

