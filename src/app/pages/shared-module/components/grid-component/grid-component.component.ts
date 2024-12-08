import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.scss']
})
export class GridComponentComponent implements OnInit,OnChanges {
  @Input()
  get data(): any[] { return this._data; }
  set data(data: any[]) {
    this._data = (data);
  }
    private _data :any[]=[{vin:'mahmoud',year:'mahmoud',brand:'mahmoud',color:'mahmoud'},
{vin:'mahmoud',year:'mahmoud',brand:'mahmoud',color:'mahmoud'},
{vin:'mahmoud',year:'mahmoud',brand:'mahmoud',color:'mahmoud'},
{vin:'mahmoud',year:'mahmoud',brand:'mahmoud',color:'mahmoud'},
{vin:'mahmoud',year:'mahmoud',brand:'mahmoud',color:'mahmoud'}
];
@Input() enableEdit:boolean=true;
@Input() enableView:boolean=true;
@Input() enebleDelete:boolean=true;
@Input()  cols :any[]
= [
  { field: 'vin', header: 'Van del' },
  { field: 'year', header: 'Year' },
  { field: 'brand', header: 'Brand' },
  { field: 'color', header: 'Color' }
];
  constructor(private router : Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.data=changes['data'].currentValue;
    this.cols=changes['cols'].currentValue;
  }

  ngOnInit(): void {
  }
  routrToEdit(){
      this.router.navigateByUrl("/question/edit/1");
  }
  routrToDetails(){
    this.router.navigateByUrl("/question/details/1");

  }
  deleteItem(item:any){
    this.data.splice(this.data.indexOf(item),1)
    alert("deleted")

  }

}


