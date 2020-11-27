import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { URL } from './globals';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  error = { show: false, message: '' }

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getCustomers(){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    })
    return this.http.get(`${URL}/customer`, { headers });
  }

  getIvactiveCustomers(){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    })
    return this.http.get(`${URL}/employee/customer/inactive`, { headers });
  }

  deleteCustomer(idCliente){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.delete(`${URL}/employee/customer?idCliente=${idCliente}`, { headers }).subscribe((res: any) => {
        resolve(res.message);
      }, (err: any) => {
        reject(err.error.error);
      })
    })
  }

  reactiveCustomer(id: number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.put(`${URL}/employee/customer/active`, { idCliente: id },{ headers }).subscribe((res: any) => {
        resolve(res.message);
      }, (err: any) => {
        reject(err.error.error);
      });
    })
  }

  changePassword(id: number, passwd: string){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    })
    return this.http.put(`${URL}/employee/customer/password`, { idCliente: id, passwd }, { headers });
  }


  //Error getters & setters

  setError(err:string){
    console.log('error set');
    this.error = { show: true, message: err }
  }

  getError(){
    return this.error;
  }

  removeError(){
    this.error = { show: false, message: '' };
  }

  

}
