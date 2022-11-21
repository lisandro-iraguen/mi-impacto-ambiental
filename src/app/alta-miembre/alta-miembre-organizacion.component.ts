import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MiembroOrganizacion } from './MiembroOrganizacion';

interface TipoOrganizacion {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-alta-miembre-organizacion',
  templateUrl: './alta-miembre-organizacion.component.html',
  styleUrls: ['./alta-miembre-organizacion.component.css']
})


export class AltaMiembreOrganizacionComponent implements OnInit {
  errorMessage: any;
  public miembre = new MiembroOrganizacion();
  constructor(private router: Router,private http: HttpClient) { }
  ngOnInit(): void {} 

  public enviarConsulta(){
    let httpHeaders = new HttpHeaders({   
    });    
    
    const headers = { 'content-type': 'application/json'}
    this.miembre.id_usuario = localStorage.getItem('usuarie-id')?.toString();     
    const body=JSON.stringify(this.miembre);
    console.log(body)

    this.http.post("http://localhost:8080/administrador", body, { headers: httpHeaders }).pipe(
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


  public cargarDatos(e:any) {
    this.miembre.id_organizacion=e.id.toString();
}

  public isEnabled(){
    return !((this.miembre.razonSocial!=null) && (this.miembre.direccion!=null)&& ( this.miembre.id_organizacion!=null))     
  }
}

