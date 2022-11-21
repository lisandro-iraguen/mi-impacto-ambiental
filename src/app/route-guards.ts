import {Injectable} from '@angular/core';  
import {CanActivate, Router} from '@angular/router'  
import { AuthService } from './auth/auth.service';

@Injectable()  
export class RouteGaurd implements CanActivate{  
  constructor(public auth: AuthService, public router: Router) {}
   canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;

    return true
  }
}  