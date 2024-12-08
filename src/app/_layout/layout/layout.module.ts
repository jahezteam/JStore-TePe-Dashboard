import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../../modules/i18n';
import { LayoutComponent } from './layout.component';
import { ExtrasModule } from '../partials/layout/extras/extras.module';
import { Routing } from '../../pages/routing';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AsideMenuComponent } from './components/aside/aside-menu/aside-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { SharedModule } from 'primeng/api';
import { SharedModuleModule } from '../../pages/shared-module/shared-module.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  }
];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ToolbarComponent,
    AsideMenuComponent,
    TopbarComponent,
    HeaderMenuComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslationModule,
    ExtrasModule,
    TranslateModule,
    SharedModule,
    SharedModuleModule
  ],
  exports: [RouterModule],
})
export class LayoutModule { }
