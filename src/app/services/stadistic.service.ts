import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class StadisticService {


  constructor(private http: HttpClient, private loginService: LoginService) { }

  getDashboardStadistic(){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    })
    return new Promise((resolve, reject) => {
      this.http.get(`${URL}/auth/dashboard`, { headers }).subscribe((res: any) => {
        resolve(res.results);
      }, (err: any) => {
        reject(err.error.error);
      })
    })
  }
}
