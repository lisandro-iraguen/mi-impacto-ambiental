import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public goToUsuarieSignUp(){
    this.router.navigate(['/usuarie'])
  }
  public goToAdministradorSignUp(){
    this.router.navigate(['/admin'])
  }
}
