import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  @Output() public data = new EventEmitter<{value:string, id:number}>();
  constructor() { }

  ngOnInit(): void {
  }
  reportes: Reporte[] = [
    {value: 'imprimir-Composicion-HC', viewValue: 'imprimir Composicion HC'},
    {value: 'imprimirTodoLosSectoresDeLaBaseDeDatos', viewValue: 'Imprimir Todo Los Sectores'},
    {value: 'imprimirComposicionHC', viewValue: 'Imprimir Composicion HC Organizacion'},
    {value: 'imprimirHCTotalTipoDeOrganizacion', viewValue: 'Imprimir HC Total Tipo De Organizacion'},//TODO: falta el periodo
    {value: 'imprimirEvolucionHCSector', viewValue: 'Imprimir Evolucion HC Sector'},
    {value: 'imprimirTodoLasOrganizacionesDeLaBaseDeDatosXPeriodicidadMensual', viewValue: 'Imprimir Todo Las Organizaciones X Periodicidad Mensual'},
    {value: 'imprimirTodoLasOrganizacionesDeLaBaseDeDatosXPeriodicidadAnual', viewValue: 'Imprimir Todo Las Organizaciones X Periodicidad Anual'},
    {value: 'imprimirEvolucionHCOrganizacion', viewValue: 'Imprimir Evolucion HC Organizacion'}    //TODO: falta el periodidicad
  ];

  public selectedValue(data:any){            
    this.data.emit({value:data.value.viewValue, id:data.value.value});
  }
}
interface Reporte {
  value: string;
  viewValue: string;
};