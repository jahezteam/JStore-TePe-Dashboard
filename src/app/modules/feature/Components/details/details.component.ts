import { Component } from '@angular/core';
import { allPermissions } from '../../../../pages/shared-module/Models/Permissions';
import { FeaturePermissions } from '../../Modals/feature-permissions';
import { Feature } from '../../Modals/feature';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { dropdown } from '../../../../pages/shared-module/Models/dropDown';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  valid = false;
  FeatureTypePermissions = FeaturePermissions;
  allPermissions: allPermissions = new allPermissions();
  featureTypes: dropdown[] = [] as dropdown[];
  selectedFeatureTypes: dropdown = {} as dropdown;

  form: Feature = {
    id: 0,
    nameAr: '',
    nameEn: '',
    featureTypeId: 0,
    code: '',
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthenticationService,
    private pickList: PickListService,
  ) {}

  ngOnInit(): void {
    this.pickList.getFeatureTypes().subscribe(
      (res) => {
        this.featureTypes = res.map(
          (x: any) => ({ id: x.id, name: x.name, nameEn: x.nameEn }),
        );
        this.registerForm();
        this.primengConfig.ripple = true;
      }
    )

  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  registerForm() {
    this.form = {
      id: this.config.data?.id,
      nameAr: this.config.data?.nameAr,
      nameEn: this.config.data?.nameEn,
      featureTypeId: this.config.data?.featureTypeId,
      code: this.config.data?.code,
    };
    let item = this.featureTypes.filter(
      (x) => x.id == this.config.data?.featureTypeId,
    );
    this.selectedFeatureTypes = item![0];
  }
  submit() {
    this.ref.close(null);
  }
  cancel() {
    this.ref.close(null);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  protected readonly FeaturePermissions = FeaturePermissions;
}
