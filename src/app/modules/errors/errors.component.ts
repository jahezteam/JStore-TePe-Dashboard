import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from '../settings/Services/setting.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column flex-root';
  logo!: string;
  constructor(
    private router: Router,
    private settingServices: SettingService,
  ) {}

  ngOnInit(): void {
    this.settingServices.getList().subscribe((res) => {
      this.logo =
        environment.imageUrl + res?.[0].logo.path || './assets/images/logo.png';
    });
  }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
