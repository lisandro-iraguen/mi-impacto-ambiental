import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-alta-sector',
  templateUrl: './alta-sector.component.html',
  styleUrls: ['./alta-sector.component.css']
})
export class AltaSectorComponent implements OnInit {
  sector:string | undefined
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public enviarSector(){
    let httpHeaders = new HttpHeaders({});
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.sector);
    this.http.post("http://52.142.62.129:8080/sector", body, { headers: httpHeaders }).pipe(
      map(this.extractData),
      tap((apiResult) => {
        this.extractData(apiResult)
        this.router.navigate(["organizacion"]);
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
  public volverAOrganizacion(){
    this.router.navigate(["organizacion"]);
  }

}
