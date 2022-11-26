import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
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
  location: GeolocationCoordinates | undefined;
  constructor(private router: Router, private http: HttpClient) { }

  public displayedColumns: string[] = ['x', 'y', 'horario', 'transporte', 'publico', 'servicio', 'baja'];
  dataSource = new MatTableDataSource<Fila>(this.filas);
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();;


  public mediosDeTransporte: MedioDeTransporte[] = [];
  ngOnInit(): void {
    this.http.get('http://52.142.62.129:8080/medios-de-transporte')
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
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  public finalizar() {
    let httpHeaders = new HttpHeaders({});
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.filas);
    this.http.post("http://52.142.62.129:8080/tramo", body, { headers: httpHeaders }).pipe(
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
    if (this.y_pos != undefined && this.x_pos != undefined) {
      let fila: Fila = new Fila()
      fila = { id_usuario:   localStorage.getItem('usuarie-id')?.toString(), x: this.x_pos?.toString(), y: this.y_pos?.toString(), horario: this.horario, medio: this.medioDeTrasnporteId, trasnportePublico: this.trasnportePublicoId, servicioTransporte: this.servicioTransporteId }
      if (!this.dataSource.data.some(item => item.x == fila.x && item.y==fila.y&&item.medio==fila.medio)) {
        this.dataSource.data.push(fila)
      }
      this.dataSource.sort = this.sort;
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
    this.http.get('http://52.142.62.129:8080/transporte-publico-enum')
      .pipe(map((res: any) => {
        res.forEach((item: any) => {
          this.transportePublico.push({ value: item, viewValue: item });
        })
      }))
      .subscribe();
  }
  public cargarVehiculosEnum() {
    this.http.get('http://52.142.62.129:8080/vehiculos-enum')
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

  public limpiar() {
    window.location.reload()
  }

  public transportePublicoSeleccionado(data: any) {
    this.trasnportePublicoId = data.value.viewValue
  }

  public servicioContratadoSeleccionado(data: any) {
    this.servicioTransporteId = data.value.viewValue
  }

  public puedeMostratTramos() {
    if (this.organizacionId != undefined) {
      this.muestraTramos = true;
    }
  }

  public deleteTicket(i: number) {
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
  }
  public cargarDatosOrganizacion(e: any) {
    this.organizacionId = e.id
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}





interface Tipo {
  value: string;
  viewValue: string;
};
