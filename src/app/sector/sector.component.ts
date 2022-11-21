import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  @Output() public data = new EventEmitter<{value:string, id:number}>();
  constructor(private http: HttpClient) { }

  sectores: Sector[] = [ ];
  ngOnInit(): void {
    this.http.get('http://localhost:8080/sectores')
      .pipe(map((res: any) => {
        res.forEach((item: any)=>{
          this.sectores.push({ value: item.id, viewValue: item.tipoSector })
        })

      }))
      .subscribe();
  }

  public selectedValue(data:any){        
    this.data.emit({value:data.value.viewValue, id:data.value.value});
  }
}

interface Sector{
  value: string;
  viewValue: string;
};
