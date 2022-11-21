import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  tipos: Tipo[] = [
    {value: 'tipo-b-1', viewValue: 'tipo b 1'},
    {value: 'tipo-b-2', viewValue: 'tipo b 2'},
    {value: 'tipo-b-3', viewValue: 'tipo b 3'},
  ];
  
}


interface Tipo {
  value: string;
  viewValue: string;
};