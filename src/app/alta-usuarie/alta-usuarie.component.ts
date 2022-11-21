import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuarie } from './Usuarie';

@Component({
  selector: 'app-alta-usuarie',
  templateUrl: './alta-usuarie.component.html',
  styleUrls: ['./alta-usuarie.component.css']
})
export class AltaUsuarieComponent implements OnInit {
  public usuarie = new Usuarie();
  constructor(private router: Router,private http: HttpClient) { }

 
  ngOnInit(): void {
  }
  public enviar_usuario(){
    let httpHeaders = new HttpHeaders({   
    });             
    const headers = { 'content-type': 'application/json'}
    console.log(this.usuarie)
    const body=JSON.stringify(this.usuarie);
    console.log(body)

    this.http.post("http://localhost:8080/usuarie", body, { headers: httpHeaders }).pipe(
      map(this.extractData),
      tap((apiResult) => {          
          this.router.navigate(["/home"]);
      }),
      catchError(this.handleErrorObservable)
    ).subscribe();
  }

  public isEnabled(){
    return !((this.usuarie.nombre!=null) && (this.usuarie.apellido!=null) && (this.usuarie.documento!=null) && (this.usuarie.password!=null))     
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
