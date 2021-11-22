import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }
  canActivate(): boolean {
    const conf = JSON.parse(localStorage.getItem('conf')|| '{}')
    if (!(conf && conf.userType)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
