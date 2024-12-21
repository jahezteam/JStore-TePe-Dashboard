import { ChangeDetectorRef, Component } from '@angular/core';
import { ValidateService } from '../../../../pages/shared-module/Services/validate.service';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Setting, SettingPermissions } from '../../Models/setting';
import { Router } from '@angular/router';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { CategorysService } from '../../../Category/Services/category.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { SettingService } from '../../Services/setting.service';
import { SharedModuleModule } from '../../../../pages/shared-module/shared-module.module';
import * as L from 'leaflet';
import { BranchModule } from '../../../branch/branch.module';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [SharedModuleModule, BranchModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [
    ValidateService,
    MessageService,
    DialogService,
    ConfirmationService,
  ],
})
export class FormComponent {
  data: any;
  valid = false;
  settingPermissions = SettingPermissions;
  form: Setting = {
    id: 0,
    logo: null,
    logoEn: null,
    lightLogo: null,
    lightLogoEn: null,
    address: '',
    addressEn: '',
    name: '',
    nameEn: '',
    footerDescription: '',
    footerDescriptionEn: '',
    lat: 0,
    long: 0,
    email: '',
    unifiedNumber: '',
    globalColor: '',
    globalDarkColor: '',
    secondaryColor: '',
    blackishColor: '',
    linkColor: '',
    linkHoverColor: '',
    gloablecolorDashboard: '',
    secondaryColorDashboard: '',
    facebook: '',
    twitter: '',
    instagram: '',
    snapchat: '',
    youtube: '',
    whatsapp: '',
    threads: '',
    tikTok: '',
    linkedIn: '',
    telegram: '',
  };
  selectedCoordinates!: L.LatLng;
  latitude = 24.7136;
  longitude = 46.6753;
  selectedLogo: any;
  selectedLogoEn: any;
  selectedLightLogo: any;
  selectedLightLogoEn: any;
  constructor(
    private validationService: ValidateService,
    private service: SettingService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    public dialogService: DialogService,
    private changeDetection: ChangeDetectorRef,
    private picklistService: PickListService,
    private categoryService: CategorysService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.getData();
    // this.registerForm();
    this.primengConfig.ripple = true;
  }

  getData() {
    this.service.getList().subscribe((res: any) => {
      this.data = res[0] || null;
      if (this.data !== null) {
        this.form = this.data;
        this.form.logo = environment.imageUrl + this.data.logo.path;
        this.form.logoEn = environment.imageUrl + this.data.logoEn.path;
        this.form.lightLogo = environment.imageUrl + this.data.lightLogo.path;
        this.form.lightLogoEn =
          environment.imageUrl + this.data.lightLogoEn.path;
      }
    });
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  onMapClick(coordinates: L.LatLng) {
    console.log(this.form);
    this.selectedCoordinates = coordinates;
    this.latitude = coordinates.lat;
    this.longitude = coordinates.lng;
    this.form.lat = coordinates.lat;
    this.form.long = coordinates.lng;
  }
  onLogoSelected(file: any | null): void {
    if (file) {
      this.selectedLogo = file;
    } else {
      console.log('No file selected or invalid file.');
    }
  }
  onLogoEnSelected(file: any | null): void {
    if (file) {
      this.selectedLogoEn = file;
    } else {
      console.log('No file selected or invalid file.');
    }
  }
  onLightLogoSelected(file: any | null): void {
    if (file) {
      this.selectedLightLogo = file;
    } else {
      console.log('No file selected or invalid file.');
    }
  }
  onLightLogoEnSelected(file: any | null): void {
    if (file) {
      this.selectedLightLogoEn = file;
    } else {
      console.log('No file selected or invalid file.');
    }
  }
  submit() {
    this.form.logo = this.selectedLogo;
    this.form.logoEn = this.selectedLogoEn;
    this.form.lightLogoEn = this.selectedLightLogoEn;
    this.form.lightLogo = this.selectedLightLogo;
    if (this.data !== null) {
      this.service.update(this.form).subscribe(() => {
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          summary: 'success',
          detail: 'Setting updated successfully',
        });
        this.ngOnInit();
      });
    } else {
      this.service.post(this.form).subscribe(() => {
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          summary: 'Success',
          detail: 'Setting created successfully',
        });
      });
    }
  }
}
