import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-organizacion',
  templateUrl: './alta-organizacion.component.html',
  styleUrls: ['./alta-organizacion.component.css']
})
export class AltaOrganizacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
}


interface Organizacion {
  value: string;
  viewValue: string;
};

interface Sector{
  value: string;
  viewValue: string;
};