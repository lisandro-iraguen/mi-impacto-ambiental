import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
  public email=""
  public enviarSolicitud(){
      //post enviar los datos;
      // this.http.post('/alta-organizaciones',
      // JSON.stringify({
      //   username: username,
      //   password: password,
      // })).subscribe(
      // data => {
      //   alert('ok');
      // },
      // error => {
      //   console.log(JSON.stringify(error.json()));
      // }
      // )

  }
 

  //traer del backend 
  sectores: Sector[] = [
    {value: 'sector-1', viewValue: 'sector 1'},
    {value: 'sector-2', viewValue: 'sector 2'},
    {value: 'sector-3', viewValue: 'sector 3'},
  ];
}
