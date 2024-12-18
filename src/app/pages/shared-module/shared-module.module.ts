import { CommonModule } from '@angular/common';
import { TextComponent } from './components/text-component/text-component.component';
import { RadioButtonComponentComponent } from './components/radio-button-component/radio-button-component.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { TextAreaComponent } from './components/text-area-component/text-area-component.component';
import { CheckBoxComponentComponent } from './components/check-box-component/check-box-component.component';
import { GridComponentComponent } from './components/grid-component/grid-component.component';
import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { MessageService } from 'primeng/api'; //api
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { NumberComponent } from './components/number/number.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { DropdownModule } from 'primeng/dropdown';
import { PickListComponent } from './components/pick-list-component/pick-list-component.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DateInputComponent } from './components/date-input/date-input.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { PagingComponent } from './components/paging/paging.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IsAuthorizedDirective } from './Directives/is-authorized.directive';
import { ImageModule } from 'primeng/image';
import { PickListMultiSelectComponent } from './components/pick-list-multi-select/pick-list-multi-select.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './components/editor/editor.component';
import { MagnificPopupDirective } from './Directives/magnific-popup.directive';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ColorInputComponent } from './components/color/color.component';

const NGX_EDITOR_CONFIG = {
  locals: {
    // menu
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    strike: 'Strike',
    blockquote: 'Blockquote',
    bullet_list: 'Bullet List',
    ordered_list: 'Ordered List',
    heading: 'Heading',
    h1: 'Header 1',
    h2: 'Header 2',
    h3: 'Header 3',
    h4: 'Header 4',
    h5: 'Header 5',
    h6: 'Header 6',
    align_left: 'Left Align',
    align_center: 'Center Align',
    align_right: 'Right Align',
    align_justify: 'Justify',
    text_color: 'Text Color',
    background_color: 'Background Color',
    horizontal_rule: 'Horizontal rule',
    format_clear: 'Clear Formatting',
    insertLink: 'Insert Link',
    removeLink: 'Remove Link',
    insertImage: 'Insert Image',
    indent: 'Increase Indent',
    outdent: 'Decrease Indent',
    superscript: 'Superscript',
    subscript: 'Subscript',
    undo: 'Undo',
    redo: 'Redo',
    url: 'URL',
    text: 'Text',
    openInNewTab: 'Open in new tab',
    insert: 'Insert',
    altText: 'Alt Text',
    title: 'Title',
    remove: 'Remove',
    enterValidUrl: 'Please enter a valid URL',
  },
};
@NgModule({
  declarations: [
    TextComponent,
    ImageUploadComponent,
    RadioButtonComponentComponent,
    PickListComponent,
    TextAreaComponent,
    CheckBoxComponentComponent,
    GridComponentComponent,
    NumberComponent,
    EmailComponent,
    PasswordComponent,
    DateInputComponent,
    PagingComponent,
    IsAuthorizedDirective,
    PickListMultiSelectComponent,
    EditorComponent,
    ColorInputComponent,
    MagnificPopupDirective,
  ],
  imports: [
    NgbDropdownModule,
    NgbModule,
    CommonModule,
    DialogModule,
    AccordionModule,
    InputTextModule,
    FormsModule,
    MessagesModule,
    DropdownModule,
    ConfirmDialogModule,
    InputSwitchModule,
    MessageModule,
    InputTextareaModule,
    InputNumberModule,
    RippleModule,
    InputNumberModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    RadioButtonModule,
    CheckboxModule,
    CardModule,
    ToastModule,
    NgxPermissionsModule.forRoot(),
    NgbModalModule,
    HttpClientModule,
    FileUploadModule,
    ImageModule,
    TableModule,
    MultiSelectModule,
    ToggleButtonModule,
    NgxEditorModule.forRoot(NGX_EDITOR_CONFIG),
  ],
  exports: [
    TextComponent,
    NgbModule,
    TableModule,
    DialogModule,
    RadioButtonComponentComponent,
    PickListComponent,
    NumberComponent,
    ProgressSpinnerModule,
    TextAreaComponent,
    CheckBoxComponentComponent,
    GridComponentComponent,
    ButtonModule,
    InputSwitchModule,
    CardModule,
    FormsModule,
    ToastModule,
    NgbDropdownModule,
    ConfirmDialogModule,
    EmailComponent,
    MultiSelectModule,
    PagingComponent,
    PasswordComponent,
    DateInputComponent,
    ImageModule,
    NgxPermissionsModule,
    DialogModule,
    NgbModalModule,
    IsAuthorizedDirective,
    AccordionModule,
    CheckboxModule,
    DropdownModule,
    PickListMultiSelectComponent,
    ToggleButtonModule,
    EditorComponent,
    NgxEditorModule,
    MagnificPopupDirective,
    ImageUploadComponent,
    ColorInputComponent,
  ],
  providers: [MessageService],
})
export class SharedModuleModule {}
