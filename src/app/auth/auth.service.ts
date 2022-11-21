import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    const estaLogeado = localStorage.getItem('usuarie');
    return (estaLogeado!=null);
  }
}