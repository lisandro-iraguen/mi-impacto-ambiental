import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }
  public role:any;
  ngOnInit(): void {
      const storedRole=localStorage.getItem('role');
      this.role="USUARIO";
      if(storedRole!=null){
        this.role=localStorage.getItem('role')
      }
  }

  public esAdmin(){
    return this.role=="ADMIN";    
  }

  public goTO(route:string){
     this.router.navigate([route]);
  }

}
