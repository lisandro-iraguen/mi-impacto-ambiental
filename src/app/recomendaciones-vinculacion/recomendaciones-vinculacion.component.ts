import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendaciones-vinculacion',
  templateUrl: './recomendaciones-vinculacion.component.html',
  styleUrls: ['./recomendaciones-vinculacion.component.css']
})
export class RecomendacionesVinculacionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  trabajadores: Trabajador[] = [
    {value: 'trabajador-1', viewValue: 'trabajador 1'},
    {value: 'trabajador-2', viewValue: 'trabajador 2'},
    {value: 'trabajador-3', viewValue: 'trabajador 3'},
  ];

  public goToRecomendaciones(){
    this.router.navigate(["recomendaciones"]);
  }
}
interface Trabajador{
  value: string;
  viewValue: string;
};