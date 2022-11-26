import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Zona } from './Zona';

interface Organizacion {
  value: string;
  viewValue: string;
};

interface Sector{
  value: string;
  viewValue: string;
};
@Component({
  selector: 'app-alta-zona-trabajo',
  templateUrl: './alta-zona-trabajo.component.html',
  styleUrls: ['./alta-zona-trabajo.component.css']
})
export class AltaZonaTrabajoComponent implements OnInit {
  zonaDeTrabajo:Zona=new Zona();
  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  public enviarSolicitud(){
  
    let httpHeaders = new HttpHeaders({   
    });             
    const headers = { 'content-type': 'application/json'}
    
    const body=JSON.stringify(this.zonaDeTrabajo);
    console.log(body)

    this.http.post("http://52.142.62.129:8080/zona-trabajo", body, { headers: httpHeaders }).pipe(
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
  public cargarDatosOrganizacion(e:any) {
    this.zonaDeTrabajo.id_organizacion=e.id.toString();
  }
  public cargarDatosSector(e:any) {
    this.zonaDeTrabajo.id_sector=e.id.toString();
  }
 

}
