import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public user = { name: '', lastName: '' }

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    this.getUserProfile();
  }

  getUserProfile(){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.get(`${URL}/employee/profile`, { headers }).subscribe((res:any) => {
        this.user = {name:res.results.nombre, lastName: res.results.apellido};
        resolve(this.user);
      },(err: any) => {
        this.loginService.removeToken();
        this.router.navigateByUrl('/login');
      });
    });
  }

}
