import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as arLang } from './modules/i18n/vocabs/ar';

import { LoaderServiceService } from './pages/shared-module/Loader/loader-service.service';
import { DOCUMENT } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  currentLang = localStorage.getItem('language') || 'en';
  constructor(
    private translationService: TranslationService,
    public loadingService: LoaderServiceService,
    @Inject(DOCUMENT) private doc: Document,
    private renderer: Renderer2,
  ) {
    // register translations
    this.translationService.loadTranslations(enLang, arLang);
  }

  ngOnInit() {
    this.handleLanguageChange(this.currentLang);
  }

  handleLanguageChange(lang: string) {
    const htmlElement = this.renderer.selectRootElement('html', true);

    if (lang === 'ar') {
      this.renderer.setAttribute(htmlElement, 'dir', 'rtl');
      this.renderer.addClass(htmlElement, 'rtl');
      const changeStyle = this.doc.getElementById('switch-style');
      if (changeStyle) {
        changeStyle.setAttribute('href', './assets/css/rtl.css');
      }
    }
    if (lang === 'en') {
      this.renderer.setAttribute(htmlElement, 'dir', 'ltr');
      this.renderer.addClass(htmlElement, 'ltr');
      const changeStyle = this.doc.getElementById('switch-style');
      if (changeStyle) {
        changeStyle.setAttribute('href', './assets/css/ltr.css');
      }
    }
  }
}
