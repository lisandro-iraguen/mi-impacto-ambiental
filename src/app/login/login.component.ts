import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuarie:string="";
  public password:string=""
  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  public goToLogin(){
    localStorage.clear;
    
          this.http.get('http://52.142.62.129:8080/usuarie/'+this.usuarie+'/'+this.password)
           .pipe(map((res: any) => {
            localStorage.setItem('usuarie',res.nombre)    
            localStorage.setItem('usuarie-id',res.id)    
            localStorage.setItem('role',res.tipoUsuario)    
            this.router.navigate(['/home'])
           }), catchError(this.handleErrorObservable))
           .subscribe();
    
  }
  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    localStorage.clear;
    return throwError(error);
  } 

  public goToSignUp(){
    this.router.navigate(['/sign-up'])
  }
}
