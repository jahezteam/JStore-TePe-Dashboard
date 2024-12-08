import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit ,OnChanges{
  displayPager: number[]=[] as number[];
  constructor() {}

  @Input() currentPage: number=0;
  @Input() setSlic = true;
  @Input() pager: number[]=[] as number[];
  @Input() totalPages: number=0;
  @Input() pageSize: number=0;
  @Input() pagesNumber: number=5;

  @Output() clickSetPage = new EventEmitter();
  @Output() clickSetPageSize = new EventEmitter();
  displayedPages: number[] = []; // Array to hold the currently displayed pages

  ngOnInit() {
    if (this.setSlic) this.changePage();
  }
  //  setPage(page: number) {
  //    this.clickSetPage.emit(page);

  //     this.changePage();

  // }
  updateDisplayedPages() {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pagesNumber / 2));
    const endPage = Math.min(startPage + this.pagesNumber - 1, this.totalPages);

    this.displayedPages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
  }

//   setPageSize(pageSize: number) {
//     this.pageSize=pageSize;
//     this.clickSetPageSize.emit(pageSize);

//      this.changePage();

//  }

setPage(page: number) {
  this.clickSetPage.emit(page);
  this.currentPage = page;
  this.updateDisplayedPages();
  // Add logic to fetch data for the selected page
  // ...
}

setPageSize(size: number) {
  this.clickSetPageSize.emit(size);
  this.pageSize = size;
  this.updateDisplayedPages();
  // Add logic to fetch data for the new page size and reset the current page if necessary
  // ...
}
  async changePage() {
    this.displayPager = this.pager?.slice(Math.max(0, this.currentPage - this.pageSize) , Math.min(this.currentPage + this.pageSize, this.totalPages));
    this.updateDisplayedPages();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pager=changes['pager']?.currentValue
    //this.pageSize=changes.pageSize?.currentValue

    this.changePage();

}
}

