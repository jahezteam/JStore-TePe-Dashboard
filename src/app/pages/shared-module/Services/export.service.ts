import { ElementRef, Injectable, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }
  exportexcel(elemntid:string,filename:string): void
  {
    /* pass here the table id */
    // let element = document.getElementById(elemntid);
    const element: HTMLElement = document.getElementById(elemntid)!;

    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, filename);

  }
}
