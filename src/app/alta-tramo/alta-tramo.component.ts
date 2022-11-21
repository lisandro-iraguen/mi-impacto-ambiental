import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Fila } from './Fila';
import { MedioDeTransporte } from './MedioDeTransporte';

@Component({
  selector: 'app-alta-tramo',
  templateUrl: './alta-tramo.component.html',
  styleUrls: ['./alta-tramo.component.css']
})

export class AltaTramoComponent implements OnInit {
  public medioDeTrasnporteId: string | undefined
  public x_pos: number | undefined;
  public y_pos: number | undefined;
  public x_tramo_pos: number | undefined;
  public y_tramo_pos: number | undefined;
  public horario: string | undefined;
  public trasnportePublicoId: string | undefined;
  public servicioTransporteId: string | undefined;
  public organizacionId: string | undefined;
  transportePublico: Tipo[] = [];
  vehiculos: Tipo[] = [];
  filas: Fila[] = [];
  public muestraTramos: boolean = false;
  constructor(private router: Router, private http: HttpClient) { }

  public displayedColumns: string[] = ['x', 'y', 'horario', 'transporte', 'publico', 'servicio'];
  dataSource = new MatTableDataSource<Fila>(this.filas);
  @ViewChild(MatTable) table!: MatTable<any>;

  public mediosDeTransporte: MedioDeTransporte[] = [];
  ngOnInit(): void {
    this.http.get('http://localhost:8080/medios-de-transporte')
      .pipe(map((res: any) => {
        res.forEach((item: any) => {
          if (item.TransporteAPie != null)
            this.mediosDeTransporte.push({ value: item.TransporteAPie.id, viewValue: "A Pie" })
          if (item.TransporteEnBicicleta != null)
            this.mediosDeTransporte.push({ value: item.TransporteEnBicicleta.id, viewValue: "En Bicicleta" })
          if (item.TransportePublico != null)
            this.mediosDeTransporte.push({ value: item.TransportePublico.id, viewValue: "Transporte Publico" })
          if (item.VehiculoParticular != null)
            this.mediosDeTransporte.push({ value: item.VehiculoParticular.id, viewValue: "Vehiculo Particular" })
          if (item.ServicioContratado != null)
            this.mediosDeTransporte.push({ value: item.ServicioContratado.id, viewValue: "Servicio Contratado" })
        })

      }))
      .subscribe();
  }

  public finalizar() {
    let httpHeaders = new HttpHeaders({});
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.filas);
    this.http.post("http://localhost:8080/tramo", body, { headers: httpHeaders }).pipe(
      map(this.extractData),
      tap((apiResult) => {
        this.extractData(apiResult)
        this.router.navigate(["home"]);
      }),
      catchError(this.handleErrorObservable)
    ).subscribe();
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }
  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  }

  public ingresar_nuevo_tramo() {
    if (this.y_pos != undefined && this.y_pos != undefined) {
      this.dataSource.data.push({ x: this.x_pos?.toString(), y: this.y_pos?.toString(), horario: this.horario, medio: this.medioDeTrasnporteId, trasnportePublico: this.trasnportePublicoId, servicioTransporte: this.servicioTransporteId })
      this.table.renderRows();
    }
  }
  public selectedValue(data: any) {
    this.trasnportePublicoId = ''
    this.servicioTransporteId = ''
    this.medioDeTrasnporteId = data.value.viewValue

    if (this.esTransportePublico()) {
      this.cargarTransportePublicoEnum()
    }
    if (this.esTrasnporteParticular()) {
      this.cargarVehiculosEnum()
    }

  }

  public esTransportePublico() {
    return (this.medioDeTrasnporteId == 'Transporte Publico')
  }

  public cargarTransportePublicoEnum() {
    this.http.get('http://localhost:8080/transporte-publico-enum')
      .pipe(map((res: any) => {
        res.forEach((item: any) => {
          this.transportePublico.push({ value: item, viewValue: item });
        })
      }))
      .subscribe();
  }
  public cargarVehiculosEnum() {
    this.http.get('http://localhost:8080/vehiculos-enum')
      .pipe(map((res: any) => {
        res.forEach((item: any) => {
          this.vehiculos.push({ value: item, viewValue: item });
        })
      }))
      .subscribe();
  }

  public esTrasnporteParticular() {
    return (this.medioDeTrasnporteId == 'Vehiculo Particular')
  }
  public esServicioContratado() {
    return (this.medioDeTrasnporteId == 'Servicio Contratado')
  }


  public transportePublicoSeleccionado(data: any) {
    this.trasnportePublicoId = data.value.viewValue
  }

  public servicioContratadoSeleccionado(data: any) {
    this.servicioTransporteId = data.value.viewValue
  }

  public puedeMostratTramos() {
    if (this.x_tramo_pos != undefined && this.y_tramo_pos != undefined&&this.organizacionId!=undefined) {
      this.muestraTramos = true;
    }
  }


  public cargarDatosOrganizacion(e: any) {    
    this.organizacionId = e.id
  }

}





interface Tipo {
  value: string;
  viewValue: string;
};
