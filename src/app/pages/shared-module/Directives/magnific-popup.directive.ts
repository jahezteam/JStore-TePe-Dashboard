import { Directive, ElementRef, AfterViewInit } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appMagnificPopup]'
})
export class MagnificPopupDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.initializeMagnificPopup();
  }

  initializeMagnificPopup(): void {
    const element = $(this.el.nativeElement);

    // Gallery Popup
    if (element.hasClass('gallery')) {
      element.magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    }
    if (element.hasClass('img-zoom')) {
      element.magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1]
        }
      });
    }

    // Video Popup
    if (element.hasClass('magnific-youtube') || element.hasClass('magnific-vimeo') || element.hasClass('magnific-custom')) {
      element.magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
      });
    }
  }
}