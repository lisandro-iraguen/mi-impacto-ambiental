import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-visualizar-reporte',
  templateUrl: './visualizar-reporte.component.html',
  styleUrls: ['./visualizar-reporte.component.css'],
})
export class VisualizarReporteComponent implements OnInit {
  public selected:any;
  date = new Date();
  date2 = new Date();
  public year:FormControl=new FormControl(this.date.getDate())
  public month:FormControl=new FormControl(this.date2.getDate())
  constructor() { }

  ngOnInit(): void {
  }


 //traer del backend 
 periodos: Periodo[] = [
  {value: 'anual', viewValue: 'Anual'},
  {value: 'mensual', viewValue: 'Mensual'}
];


setYear(normalizedMonthAndYear: Date, datepicker: any) {
  this.year=new FormControl(normalizedMonthAndYear);
  datepicker.close();
}

setMonth(normalizedMonthAndYear: Date, datepicker: any) {
  this.month=new FormControl(normalizedMonthAndYear);
  datepicker.close();
}

}

interface Periodo {
  value: string;
  viewValue: string;
};