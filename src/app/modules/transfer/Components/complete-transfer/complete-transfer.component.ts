import { Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';
import { CompleteTransfer, TransferPermissions } from '../../Models/transfer';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-complete-transfer',
  standalone: true,
  imports: [SharedModuleModule, ReactiveFormsModule, NgForOf],
  providers: [ValidateService, DialogService, MessageService],
  templateUrl: './complete-transfer.component.html',
  styleUrl: './complete-transfer.component.scss',
})
export class CompleteTransferComponent {
  data: CompleteTransfer = {} as CompleteTransfer;
  valid = false;
  institutions: dropdown[] = [];
  institutionForm!: FormGroup;
  transferPermission = TransferPermissions;
  featureType: dropdown[] = [] as dropdown[];

  constructor(
    private validationService: ValidateService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private pickList: PickListService,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
    private fb: FormBuilder,
  ) {
    this.institutionForm = this.fb.group({
      institutionId: ['', Validators.required],
      productFeatures: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.pickList.getFeatureTypes().subscribe((res: any) => {
      this.featureType = res;
    });
    this.pickList.getInstitutions().subscribe((res) => {
      this.institutions = res;
      this.registerForm();
      this.primengConfig.ripple = true;
    });
  }
  getFeatureName(id: any) {
    return this.featureType
      .flatMap((item) => item.data)
      .find((dataItem) => dataItem?.id === id)?.name;
  }
  get productFeatures(): FormArray {
    return this.institutionForm.get('productFeatures') as FormArray;
  }
  registerForm() {
    this.config.data.forEach((item: any) => {
      const featureGroup = this.fb.group({
        productFeatureId: [item.id],
        name: [
          {
            value:
              this.getFeatureName(item.featureId) +
              ' - ' +
              item.product.titleAr,
            disabled: true,
          },
        ],
        quantaty: ['', Validators.required],
        minimumQuantaty: [null],
      });
      this.productFeatures.push(featureGroup);
    });
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  onSubmit() {
    this.valid = true;
    if (this.institutionForm.invalid) {
      return;
    }
    this.ref.close(this.institutionForm.value);
  }
  cancel() {
    this.ref.close();
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
