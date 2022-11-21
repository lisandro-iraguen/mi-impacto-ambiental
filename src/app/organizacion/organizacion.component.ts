import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {


  constructor(private http: HttpClient) { }
  @Output() public data = new EventEmitter<{value:string, id:number}>();

  organizaciones: Organizacion[] = [ ];
  ngOnInit(): void {

    this.http.get('http://localhost:8080/organizaciones')
      .pipe(map((res: any) => {
        res.forEach((item: any)=>{
          this.organizaciones.push({ value: item.id, viewValue: item.razonSocial })
        })
        
      }))
      .subscribe();      
  }

  public selectedValue(data:any){        
    this.data.emit({value:data.value.viewValue, id:data.value.value});
  }
}

interface Organizacion {
  value: string;
  viewValue: string;
};