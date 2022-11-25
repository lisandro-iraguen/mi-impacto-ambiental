import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, AfterViewInit,OnInit, ViewChild } from '@angular/core';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Dto } from './Dto';
import { Miembre } from './Miembre';


@Component({
  selector: 'app-acepta-rechaza-trabajador',
  templateUrl: './acepta-rechaza-trabajador.component.html',
  styleUrls: ['./acepta-rechaza-trabajador.component.css']
})
export class AceptaRechazaTrabajadorComponent implements OnInit {
  
  public miembros:Miembre[]=[];
  dataSource = new MatTableDataSource<Miembre>(this.miembros);
  public trabajadoresAceptados:string[]=[];
  public trabajadoresRechazados:string[]=[];
  
  public displayedColumns: string[] = ['nombre', 'apellido', 'dni','estado','baja'];
  @ViewChild(MatSort) sort: MatSort =new MatSort();;
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/miembros')
      .pipe(map((res: any) => {     
        res.forEach((item: any)=>{
          console.log(this.table.dataSource)
          this.dataSource.data.push({ id: item.id, nombre:item.nombre , apellido:item.apellido, dni:item.dni})          
          this.dataSource.sort = this.sort;
        })        
      }))
      .subscribe(); 
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

 public onChange(id:string, item:any){
 

  if(this.aceptado(item.value)){
    this.trabajadoresRechazados = this.trabajadoresRechazados.filter((item) => item !== id);
    this.trabajadoresAceptados.push(id);
  }
  if(this.rechazado(item.value)){
    this.trabajadoresAceptados = this.trabajadoresAceptados.filter((item) => item !== id);
    this.trabajadoresRechazados.push(id);
  }
 
 
 }

 public deleteTicket(i:number){  
  this.dataSource.data.splice(i, 1);
  this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
 }
 private aceptado(value:number){ return value==1 }
 private rechazado(value:number){ return value==2 }

  public enviarSolicitud(){
      let httpHeaders = new HttpHeaders({ });             
      const headers = { 'content-type': 'application/json'}     
      const dto= new Dto();
      dto.aceptados= this.trabajadoresAceptados
      dto.rechazados= this.trabajadoresRechazados
      const body=JSON.stringify(dto);
      this.http.post("http://localhost:8080/miembros", body, { headers: httpHeaders }).pipe(
        map(this.extractData),
        tap((apiResult) => {          
          this.extractData(apiResult)
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

    public limpiar(){
      window.location.reload()  
    }

    public borrarTrabajador(){ return}
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
}
