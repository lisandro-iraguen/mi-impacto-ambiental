import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  public role:any;
  public usuarie:any;
  ngOnInit(): void {     
      //localStorage.clear();
      const storedRole=localStorage.getItem('role');
      this.role="USUARIO";
      if(storedRole!=null){
        this.role=localStorage.getItem('role')
      }
      this.usuarie=localStorage.getItem('usuarie');      
  }

  public esAdmin(){
    return this.role=="ADMIN";
  }

  public estaLogeado(){
    return (localStorage.getItem('usuarie')!=null);
  }

  

 public goTO(route:string){
  this.router.navigate([route]);
}
}
