import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { userPermissions } from '../../Models/userPermissions';
import { UsersService } from '../../Services/users.service';
import { PickListService } from '../../../../pages/shared-module/Services/pick-list.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { countries } from '../../../../pages/shared-module/Models/countries-store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [MessageService, DialogService, DatePipe]
})
export class UserProfileComponent implements OnInit {
  id: any;
  userPermissions = userPermissions;
  passwordMatched = true;
  form: any = {
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    email: '',
    idNumber: '',
    job: '',
    password: '',
    permissions: [],
    phoneNumber: '',
    roles: [],
    userName: '',
    confirmPassword: '',
    isAdmin: false

  };
  constructor(private service: UsersService,
    private messageService: MessageService,private primengConfig: PrimeNGConfig,
    private router: Router, public dialogService: DialogService, private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef, private picklistService: PickListService,
    private datepipe: DatePipe, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.loadData(this.id);
  }
  isAuth(per: string) {
    return this.auth.isAuthorized(per);
  }
  public countries: any = countries;
  selectedCountry: any = "";
  loadData(id: any) {
    this.service.getById(id).subscribe((res:any) => {
      if (res) {
        this.form = res;
        this.selectedCountry = this.countries.filter((x: any) => x.name == this.form.nationality)[0];

        this.form.birthDate = this.datepipe.transform(res.birthDate, 'MM/dd/yyyy')?.toString();
        this.primengConfig.ripple = true;
        this.changeDetection.detectChanges();
        this.loadImage(this.form.userName);
        this.changeDetection.detectChanges();
      }
      else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
      }
    });
  }
  routrToList() {
    this.router.navigateByUrl("/users/list");
  }

  cancel() {
  }
  url: any = '';
  loadImage(userName: string) {
    this.service.getImage(userName).subscribe((res: any) => {
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
    },
  
  (error)=>{console.log(error)});
    
  }

}


