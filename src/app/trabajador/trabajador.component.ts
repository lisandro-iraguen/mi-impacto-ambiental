import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {

  constructor(private http: HttpClient) { }

  trabajadores: Trabajador[] = [ ];
  ngOnInit(): void {
    
    this.http.get('http://localhost:8080/trabajadores')
      .pipe(map((res: any) => {
        res.forEach((item: any)=>{
          this.trabajadores.push({ value: item.id, viewValue: item.nombre +" " +item.apellido  })
        })
        
      }))
      .subscribe();   
  }
 
}

interface Trabajador{
  value: string;
  viewValue: string;
};