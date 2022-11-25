import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-mediciones',
  templateUrl: './registrar-mediciones.component.html',
  styleUrls: ['./registrar-mediciones.component.css']
})
export class RegistrarMedicionesComponent implements OnInit {
  public lineaTexto: any;
  id_organizacion: string | undefined;
  fileToUpload: File | null = null;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public enviarMedicionLinea() {
    let httpHeaders = new HttpHeaders({   
    });    
    
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(this.lineaTexto);
    console.log(body)
  
    this.http.post("http://localhost:8080/medicion/"+this.id_organizacion, body, { headers: httpHeaders }).pipe(
      map(this.extractData),
      tap((apiResult) => {          
      this.lineaTexto="";
    }),
      catchError(this.handleErrorObservable)
    ).subscribe();
  }
  public enviarMedicionArchivo() {
    let httpHeaders = new HttpHeaders(({ "Content-Type": "multipart/form-data" }));    
    
    const headers = { 'content-type': 'application/json'}
    const body=this.fileToUpload;
    console.log(body)
  
    this.http.post("http://localhost:8080/medicion/"+this.id_organizacion, body, { headers: httpHeaders }).pipe(
      map(this.extractData),
      tap((apiResult) => {          
      this.lineaTexto="";
    }),
      catchError(this.handleErrorObservable)
    ).subscribe();
  }

  csvInputChange(fileInputEvent: any) {
    this.fileToUpload=(fileInputEvent.target.files[0]);    
  }
  public cargarDatosOrganizacion(e:any) {
    this.id_organizacion=e.id.toString();
  }
  private extractData(res: any) {
    let body = res;
    return body;
  }
  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  } 
}


