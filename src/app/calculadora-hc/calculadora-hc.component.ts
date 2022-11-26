import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Calculo } from './Calculo';
import { Periodo } from './Periodo';

@Component({
  selector: 'app-calculadora-hc',
  templateUrl: './calculadora-hc.component.html',
  styleUrls: ['./calculadora-hc.component.css']
})
export class CalculadoraHCComponent implements OnInit {
  public calculo:Calculo=new Calculo();
   
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
 
 periodos: Periodo[] = [
  {value: 'anual', viewValue: 'Anual'},
  {value: 'mensual', viewValue: 'Mensual'}
];

 
public enviarConsulta(){

  if(this.calculo.organizacionId==null)return;
  if(this.calculo.periodicidad==null)return;

  let httpHeaders = new HttpHeaders({   
  });    
  
  const headers = { 'content-type': 'application/json'}
  const body=JSON.stringify(this.calculo);
  console.log(body)

  this.http.post("http://52.142.62.129:8080/calculadora-hc", body, { headers: httpHeaders }).pipe(
    map(this.extractData),
    tap((apiResult) => {          
    
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
  this.calculo.organizacionId=e.id.toString();
}
    
}

