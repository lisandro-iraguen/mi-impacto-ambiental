import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Fila } from './Fila';
import { Organizacion } from './Organizacion';
import { Sector } from './Sector';
import { TipoOrganizacion } from './TipoOrganzacion';

@Component({
  selector: 'app-alta-organizacion',
  templateUrl: './alta-organizacion.component.html',
  styleUrls: ['./alta-organizacion.component.css']
})
export class AltaOrganizacionComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient) { }
  location: GeolocationCoordinates | undefined;
  public razon_social:string | undefined;
  tiposOrganizacion: TipoOrganizacion[] = [];
  clasificacionesOrganizacion: TipoOrganizacion[] = [];
  sectores: Sector[] = [];
  tiposOrganizacionId: string | undefined;
  clasificacionOrganizacionId: string | undefined;
  sectorId: string | undefined;
  sectorNombre: string | undefined;
  public x_pos: number | undefined;
  public y_pos: number | undefined;
  public displayedColumns: string[] = ['id', 'nombre','baja'];
  filas: Fila[] = [];
  dataSource = new MatTableDataSource<Fila>(this.filas);

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort =new MatSort();;

  
  ngOnInit(): void {
    this.cargarTipoOrganizacionEnum();
    this.clasificacionDeLaOrganizacionEnum();
    this.agregarSectores();

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.x_pos=this.location.latitude;
        this.y_pos=this.location.longitude;
      });
   }
  }
  

  public cargarTipoOrganizacionEnum() {
    this.http.get('http://52.142.62.129:8080/organizacion-tipo-enum')
      .pipe(map((res: any) => {
        res.forEach((item: any) => {
          this.tiposOrganizacion.push({ value: item, viewValue: item });
        })
      }))
      .subscribe();
  }

  public clasificacionDeLaOrganizacionEnum() {
    this.http.get('http://52.142.62.129:8080/organizacion-clasificacion-enum')
      .pipe(map((res: any) => {
        res.forEach((item: any) => {
          this.clasificacionesOrganizacion.push({ value: item, viewValue: item });
        })
      }))
      .subscribe();
  }

  public agregarSectores() {
    this.http.get('http://52.142.62.129:8080/sectores')
      .pipe(map((res: any) => {
        res.forEach((item: any) => {
          this.sectores.push({ value: item.id, viewValue: item.value });
        })
      }))
      .subscribe();
  }

  public guardarOrganizacion(){
    let httpHeaders = new HttpHeaders({   
    });    
    
    const headers = { 'content-type': 'application/json'}
    const organizacion:Organizacion = new Organizacion();
    organizacion.razon_social=this.razon_social;
    organizacion.tipoOrganizacion=this.tiposOrganizacionId;
    organizacion.clasificacionOrganizacion=this.clasificacionOrganizacionId;
    organizacion.sectores= this.dataSource.data;
    const body=JSON.stringify(organizacion);
    console.log(body)

    this.http.post("http://52.142.62.129:8080/organizacion", body, { headers: httpHeaders }).pipe(
      map(this.extractData),
      tap((apiResult) => {          
        this.router.navigate(["/home"]);
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
  
  public irASector(){ 
    this.router.navigate(["sector"]);
  }

  public limpiar(){
    window.location.reload()  
  }

  public cargarDatos(e:any) {    
    this.sectorId=e.id.toString();
    this.sectorNombre=e.value.toString();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public cargarSector(){
    let fila:Fila = new Fila()
    fila={ id:this.sectorId , nombre:this.sectorNombre}    
    if(!this.dataSource.data.some(item => item.id==fila.id)){
      this.dataSource.data.push(fila)
      this.dataSource.sort = this.sort;
    }
  }

  public selectedTipoValue(data: any) {
    this.tiposOrganizacionId = data.value.viewValue
  }
  public selectedClasificacionValue(data: any) {
    this.clasificacionOrganizacionId = data.value.viewValue
  }

  public selectedSectorValue(data: any) {
    this.sectorId = data.value.viewValue
  }
  public deleteTicket(i:number){  
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
   }
}

