import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  error = { show: false, message: '' };

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

  //Getting loads to be dispatched

  getDispatchLoad(){ 
    const headers = new HttpHeaders({ 
      token: this.loginService.getToken()
    })
    return this.http.get(`${URL}/tracking/dispatch`, { headers });
  }

  dispatchLoad(idCarga: number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.post(`${URL}/tracking/dispatch`, { idCarga }, { headers }).subscribe((res: any) => {
        resolve(res.message);
      }, (err: any) => {
        reject(err.error);
      })
    });
  }

  //Updating when the customer send his package
  getTrackingByLoad(id: number){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    })
    return this.http.get(`${URL}/tracking/byQuery?idCarga=${id}`, { headers });
  }

  getPackagesByLoadId(idCarga: number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.get(`${URL}/package/byLoadId?idCarga=${idCarga}`, { headers }).subscribe((res: any) => {
        resolve(res.result);
      }, (err: any) => {
        console.log(err);
      })
    })
  }

  updateLocation(idCarga: number, lat: number, lng: number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.post(`${URL}/tracking/updateLocation`, { idCarga, lat, lng }, { headers }).subscribe((res: any) => {
        resolve(res.message);
      }, (err: any) => {
        reject(err.error);
      })
    });
  }


  //Errors Setters and Getters

  setError(error: string){
    this.error = { show: true, message: error }
  }

  getError(){
    return this.error;
  }

  removeError(){
    this.error = { show: false, message: '' };
  }


  //Allow location
  getCurrentLocation(){
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((coords)=>{
        resolve({ lat: coords.coords.latitude, lng: coords.coords.longitude });
      }, () => {
        reject('Debes permitir la ubicacion para completar esta operacion')
      }, { enableHighAccuracy: true })
    })
  }

}
