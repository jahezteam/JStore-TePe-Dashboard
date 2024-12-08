import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BuilderComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuilderComponent,
      },
    ]),
  ],
})
export class BuilderModule {}
