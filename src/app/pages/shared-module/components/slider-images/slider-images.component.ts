// import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
// import { Router, UrlTree } from '@angular/router';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { DialogService } from 'primeng/dynamicdialog';
// import { imageObject } from '../../Models/imageObject';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { SliderImagesServiceService } from '../../../../modules/slider-images/Services/slider-images-service.service';

// @Component({
//   selector: 'app-slider-images',
//   templateUrl: './slider-images.component.html',
//   styleUrls: ['./slider-images.component.scss'],

//   providers: [MessageService, DialogService, ConfirmationService]
// })
// export class SliderImagesComponent implements OnInit {
//   imageObject :imageObject[]=[] as imageObject[];
//   isSmallScreen = false;
//   imageSize: number=33.33333;

//   constructor(private router: Router,
//     private service: SliderImagesServiceService, private changeDetection: ChangeDetectorRef,
//     private messageService: MessageService,
//     private breakpointObserver: BreakpointObserver) {
//       this.imageSize = this.calculateImageSize();

//     }
//     @HostListener('window:resize')
//     onWindowResize() {
//       this.imageSize = this.calculateImageSize();

//     }
//     calculateImageSize(): number {
//       const screenWidth = window.innerWidth;
//       // Adjust the image size based on the screen width using your desired logic
//       // Example: Set a smaller size for smaller screens and a larger size for larger screens
//       if (screenWidth < 428) {
//         return 100;
//       } else if (screenWidth < 768 && screenWidth > 428) {
//         return 50;
//       } else {
//         return 33.33333;
//       }
//     }
//     getImageSize(): any {
//       return {width:this.imageSize +'%',height:350};
//     }
//   ngOnInit(): void {
//         this.breakpointObserver.observe([
//       Breakpoints.XSmall,
//       Breakpoints.Small
//     ]).subscribe(result => {
//       this.isSmallScreen = result.matches;
//     });
//    this.loadData();
//   }
//   private isInternalUrl(url: string): boolean {
//     const currentUrlTree = this.router.parseUrl(this.router.url);
//     const urlTree = this.router.parseUrl(url);

//     // Compare the root segments of the current URL and the target URL
//     const currentSegments = currentUrlTree.root.children.primary.segments.map(segment => segment.path);
//     const targetSegments = urlTree.root.children.primary.segments.map(segment => segment.path);

//     // Check if the root segments match
//     const isInternal = currentSegments.join('/') === targetSegments.join('/');

//     return isInternal;
//   }
//   data:sliderImages[] =[] as sliderImages[];
//   loadData(){
//     this.service.getAll().subscribe(res => {
//       if (res) {
//        this.data=res;
//       //  console.log(this.data);
//        this.data.forEach(s=>{

//         this.service.getImage(s.code).subscribe((res: any) => {
//           if (res) {
//             const mimeType = res.type;
//             if (mimeType.match(/image\/*/) == null) {
//               return;
//             }
//             const reader = new FileReader();
//             reader.readAsDataURL(res);
//             reader.onload = (_event) => {
//               let url:any='';
//               url = reader.result;
//               let o:imageObject={} as imageObject;
//               o.action=s.actionUrl;
//               o.image=url;
//               o.thumbImage=url;
//               o.title=s.description;
//               o.index=s.id;
//               this.imageObject.push(o);
//               // console.log(this.imageObject);
//               this.changeDetection.detectChanges();
//             }
//           }
//           else {
//             this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
//           }
//         });
//        });
//         this.changeDetection.detectChanges();
//       }
//       else {
//         this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Error occured Please contact system adminstrator' });
//       }
//     });
//   }
//   imageClick(event:any)
//   {

//    let item =this.imageObject[event];
//    if(item?.action!=undefined && item?.action!=null && item?.action!='')
//    {
//     const isInternal: boolean = this.isInternalUrl(item?.action);

//     if (isInternal) {
//       // URL is internal, route to it
//       this.router.navigateByUrl(item?.action);
//     } else {
//       // URL is external, open it in a new window
//       window.open(item?.action, '_blank');
//     }
//    }

//   }

// }
