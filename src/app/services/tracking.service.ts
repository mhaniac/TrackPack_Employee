import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {


  constructor(private http: HttpClient, private loginService: LoginService) { }

  getPackagesByTracking(tracking: String){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    })
    return this.http.get(`${URL}/package/byQuery?trackingUsa=${tracking}`,{ headers });
  }

  registerPackage(idPaquete: number){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    });
    const datetimeRecibido = new Date();
    return new Promise((resolve, reject) => {
      this.http.put(`${URL}/package/register`, { idPaquete, datetimeRecibido }, { headers }).subscribe((res:any) => {
        resolve(res.message);
      },(err:any) => {
        reject(err.error);
      })
    })
  }

}
