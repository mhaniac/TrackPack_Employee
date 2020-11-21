import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3300';
  public user = { name: '', lastName: '' }

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    this.getUserProfile();
  }

  getUserProfile(){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.get(`${this.URL}/employee/profile`, { headers }).subscribe((res:any) => {
        this.user = {name:res.results.nombre, lastName: res.results.apellido};
        resolve(this.user);
      },(err: any) => {
        this.loginService.removeToken();
        this.router.navigateByUrl('/login');
      });
    });
  }


}
