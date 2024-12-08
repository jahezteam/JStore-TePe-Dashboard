import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserInnerComponent} from './dropdown-inner/user-inner/user-inner.component';
import {TranslationModule} from '../../../../modules/i18n';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UserInnerComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, TranslationModule],
  exports: [
    UserInnerComponent
  ],
})
export class ExtrasModule {
}
