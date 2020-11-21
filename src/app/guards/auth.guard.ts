import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from '../services/login.service';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){}

  canActivate():any {
    return this.loginService.isLogged().pipe(map(()=> true), catchError(() => {
      this.loginService.removeToken();
      return of(this.router.navigate(['login']));
    }));
  }
  
}
